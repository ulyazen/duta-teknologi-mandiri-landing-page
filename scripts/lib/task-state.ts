import * as fs from "fs/promises";
import * as path from "path";

const TASKS_DIR = path.resolve(process.cwd(), "tasks");
const TEMPLATE_DIR = path.resolve(TASKS_DIR, ".template");

export type TaskStatus =
  | "pending"
  | "scoped"
  | "designed"
  | "implemented"
  | "tested"
  | "marketing-review"
  | "reviewed"
  | "approved";

export interface TaskMeta {
  id: string;
  title: string;
  module: string;
  description: string;
  status: TaskStatus;
  assignments: {
    product_owner: string;
    system_architect: string;
    design_engineer: string;
    fullstack: string;
    qa: string;
  };
  timestamps: Record<TaskStatus, string | null>;
  git_branch: string | null;
  complexity: string | null;
}

const STATUS_ORDER: TaskStatus[] = [
  "pending",
  "scoped",
  "designed",
  "implemented",
  "tested",
  "marketing-review",
  "reviewed",
  "approved",
];

export function canComplete(from: TaskStatus, to: TaskStatus): boolean {
  const fromIdx = STATUS_ORDER.indexOf(from);
  const toIdx = STATUS_ORDER.indexOf(to);
  if (fromIdx === -1 || toIdx === -1) return false;
  return toIdx === fromIdx + 1 || (to === "approved" && from === "reviewed");
}

export async function createTask(opts: {
  title: string;
  module: string;
  description: string;
}): Promise<string> {
  const existing = await fs.readdir(TASKS_DIR).catch(() => []);
  const count = existing.filter((e) => /TASK-\d+/.test(e)).length + 1;
  const id = `TASK-${String(count).padStart(3, "0")}`;
  const slug = opts.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
  const dir = path.join(TASKS_DIR, `${id}-${slug}`);
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(path.join(dir, "03-implementation"), { recursive: true });
  // Copy templates
  for (const tpl of [
    "00-request.md",
    "01-scoped.md",
    "02-designed.md",
    "03-implementation/summary.md",
    "03-implementation/notes.md",
    "04-tested.md",
    "05-reviewed.md",
  ]) {
    try {
      const content = await fs.readFile(path.join(TEMPLATE_DIR, tpl), "utf-8");
      await fs.writeFile(path.join(dir, tpl), content);
    } catch {
      // template not present, skip
    }
  }
  const now = new Date().toISOString();
  const meta: TaskMeta = {
    id,
    title: opts.title,
    module: opts.module,
    description: opts.description,
    status: "pending",
    assignments: {
      product_owner: "pending",
      system_architect: "pending",
      design_engineer: "pending",
      fullstack: "pending",
      qa: "pending",
    },
    timestamps: {
      pending: now,
      scoped: null,
      designed: null,
      implemented: null,
      tested: null,
  marketing_review: null,
      reviewed: null,
      approved: null,
    },
    git_branch: null,
    complexity: null,
  };
  await writeMeta(dir, meta);
  return dir;
}

export async function getTaskDir(taskId: string): Promise<string> {
  const entries = await fs.readdir(TASKS_DIR, { withFileTypes: true });
  const match = entries.find(
    (e) => e.isDirectory() && e.name.startsWith(taskId)
  );
  if (!match) throw new Error(`Task ${taskId} not found`);
  return path.join(TASKS_DIR, match.name);
}

export async function readMeta(taskDir: string): Promise<TaskMeta> {
  const raw = await fs.readFile(path.join(taskDir, "meta.json"), "utf-8");
  return JSON.parse(raw) as TaskMeta;
}

export async function writeMeta(taskDir: string, meta: TaskMeta): Promise<void> {
  await fs.writeFile(
    path.join(taskDir, "meta.json"),
    JSON.stringify(meta, null, 2)
  );
}

export async function listTasks(): Promise<TaskMeta[]> {
  try {
    const entries = await fs.readdir(TASKS_DIR, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory() && e.name !== ".template");
    const metas: TaskMeta[] = [];
    for (const d of dirs) {
      try {
        const m = await readMeta(path.join(TASKS_DIR, d.name));
        metas.push(m);
      } catch {
        // skip dirs without meta.json
      }
    }
    return metas;
  } catch {
    return [];
  }
}
