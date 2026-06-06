#!/usr/bin/env tsx
import {
  canComplete,
  createTask,
  getTaskDir,
  listTasks,
  readMeta,
  writeMeta,
} from "./lib/task-state";
import type { TaskStatus } from "./lib/task-state";
import { createWorktree, removeWorktree } from "./lib/git-helpers";

const [, , command, ...args] = process.argv;

function help() {
  console.log(`
Agent Orchestrator (landing-page)

Usage:
  agent-orchestrator.ts create --title="..." --module="..." --description="..."
  agent-orchestrator.ts status --task=TASK-001
  agent-orchestrator.ts list
  agent-orchestrator.ts complete --task=TASK-001 --stage=<scoped|designed|implemented|tested|reviewed|approved>
  agent-orchestrator.ts review --task=TASK-001
  agent-orchestrator.ts worktree --task=TASK-001 --role=<scope|design|implement|test|review>

Stages: pending -> scoped -> designed -> implemented -> tested -> marketing-review -> reviewed -> approved
Worktrees: .worktrees/<role>/ (branched from main, removed after merge)
`);
}

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const arg of argv) {
    if (arg.startsWith("--")) {
      const [key, val] = arg.slice(2).split("=");
      out[key] = val ?? "true";
    }
  }
  return out;
}

async function cmdCreate() {
  const a = parseArgs(args);
  if (!a.title || !a.module) {
    console.error("Error: --title and --module are required");
    help();
    process.exit(1);
  }
  const taskDir = await createTask({
    title: a.title,
    module: a.module,
    description: a.description ?? "",
  });
  const meta = await readMeta(taskDir);
  console.log(`\n[OK] Created ${meta.id}`);
  console.log(`    Directory: ${taskDir}`);
  console.log(`    Next:      Edit 00-request.md, then run:`);
  console.log(`               agent-orchestrator.ts complete --task=${meta.id} --stage=scoped`);
}

async function cmdStatus() {
  const a = parseArgs(args);
  const taskId = a.task;
  if (!taskId) {
    console.error("Error: --task is required");
    process.exit(1);
  }
  const taskDir = await getTaskDir(taskId);
  const meta = await readMeta(taskDir);
  console.log(`\n[Task] ${meta.id}: ${meta.title}`);
  console.log(`    Module: ${meta.module}`);
  console.log(`    Status: ${meta.status}`);
  console.log(`    Complexity: ${meta.complexity ?? "n/a"}`);
}

async function cmdList() {
  const tasks = await listTasks();
  console.log("\n[Tasks]");
  if (tasks.length === 0) {
    console.log("    No tasks found.");
    return;
  }
  for (const t of tasks) {
    const icon = t.status === "approved" ? "[OK]" : t.status === "pending" ? "[NEW]" : "[WIP]";
    console.log(`    ${icon} ${t.id.padEnd(10)} ${t.status.padEnd(12)} ${t.title}`);
  }
}

async function cmdComplete() {
  const a = parseArgs(args);
  const taskId = a.task;
  const stage = a.stage as TaskStatus;
  if (!taskId || !stage) {
    console.error("Error: --task and --stage are required");
    process.exit(1);
  }
  const taskDir = await getTaskDir(taskId);
  const meta = await readMeta(taskDir);

  if (!canComplete(meta.status, stage)) {
    console.error(
      `Error: Cannot move from "${meta.status}" to "${stage}". Check stage ordering.`
    );
    process.exit(1);
  }

  meta.status = stage;
  meta.timestamps[stage] = new Date().toISOString();
  await writeMeta(taskDir, meta);
  console.log(`\n[OK] ${taskId} moved to stage: ${stage}`);
}

async function cmdReview() {
  const a = parseArgs(args);
  const taskId = a.task;
  if (!taskId) {
    console.error("Error: --task is required");
    process.exit(1);
  }
  const taskDir = await getTaskDir(taskId);
  const meta = await readMeta(taskDir);
  console.log(`\n[Review] ${meta.id}: ${meta.title}`);
  console.log(`    Status: ${meta.status}`);
  console.log(`    Next: write 05-reviewed.md, then run:`);
  console.log(`    agent-orchestrator.ts complete --task=${taskId} --stage=reviewed`);
  console.log(`    agent-orchestrator.ts complete --task=${taskId} --stage=approved`);
}

async function cmdWorktree() {
  const a = parseArgs(args);
  const taskId = a.task;
  const role = a.role;
  const action = a.action ?? "add"; // add | remove
  if (!taskId || !role) {
    console.error("Error: --task and --role are required");
    help();
    process.exit(1);
  }
  if (action === "add") {
    const branch = `feature/${taskId}-${role}`;
    const path = `.worktrees/${role}`;
    await createWorktree(path, branch);
    console.log(`[OK] Created worktree at ${path} on branch ${branch}`);
  } else if (action === "remove") {
    await removeWorktree(`.worktrees/${role}`);
    console.log(`[OK] Removed worktree at .worktrees/${role}`);
  } else {
    console.error(`Unknown action: ${action}. Use 'add' or 'remove'.`);
    process.exit(1);
  }
}

async function main() {
  switch (command) {
    case "create":
      await cmdCreate();
      break;
    case "status":
      await cmdStatus();
      break;
    case "list":
      await cmdList();
      break;
    case "complete":
      await cmdComplete();
      break;
    case "review":
      await cmdReview();
      break;
    case "worktree":
      await cmdWorktree();
      break;
    default:
      help();
      process.exit(command ? 1 : 0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
