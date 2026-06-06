import * as fs from "fs/promises";
import * as path from "path";

const AGENTS_DIR = path.resolve(process.cwd(), ".agents");

export interface PromptContext {
  request: string;
  scoped_task: string;
  designed_task: string;
  implementation_summary: string;
  implementation_notes: string;
  tested_report: string;
  prd_summary: string;
  tech_spec_summary: string;
  design_tokens: string;
  schema_reference: string;
  calculation_rules: string;
}

async function readContextFile(name: string): Promise<string> {
  try {
    return await fs.readFile(path.join(AGENTS_DIR, "context", name), "utf-8");
  } catch {
    return `[Context file ${name} not found]`;
  }
}

async function readPromptTemplate(name: string): Promise<string> {
  return await fs.readFile(
    path.join(AGENTS_DIR, "prompts", name),
    "utf-8"
  );
}

async function readTaskArtifact(
  taskDir: string,
  filename: string
): Promise<string> {
  try {
    return await fs.readFile(path.join(taskDir, filename), "utf-8");
  } catch {
    return `[${filename} not yet written]`;
  }
}

export async function buildPrompt(
  templateName: string,
  taskDir: string
): Promise<string> {
  const template = await readPromptTemplate(templateName);
  const [
    prd_summary,
    tech_spec_summary,
    design_tokens,
    schema_reference,
    calculation_rules,
    request,
    scoped_task,
    designed_task,
    implementation_summary,
    implementation_notes,
    tested_report,
  ] = await Promise.all([
    readContextFile("prd-summary.md"),
    readContextFile("tech-spec-summary.md"),
    readContextFile("design-tokens.md"),
    readContextFile("schema-reference.md"),
    readContextFile("static-build-rules.md"),
    readTaskArtifact(taskDir, "00-request.md"),
    readTaskArtifact(taskDir, "01-scoped.md"),
    readTaskArtifact(taskDir, "02-designed.md"),
    readTaskArtifact(taskDir, "03-implementation/summary.md"),
    readTaskArtifact(taskDir, "03-implementation/notes.md"),
    readTaskArtifact(taskDir, "04-tested.md"),
  ]);

  return template
    .replace(/{{prd_summary}}/g, prd_summary)
    .replace(/{{tech_spec_summary}}/g, tech_spec_summary)
    .replace(/{{design_tokens}}/g, design_tokens)
    .replace(/{{schema_reference}}/g, schema_reference)
    .replace(/{{calculation_rules}}/g, calculation_rules)
    .replace(/{{request}}/g, request)
    .replace(/{{scoped_task}}/g, scoped_task)
    .replace(/{{designed_task}}/g, designed_task)
    .replace(/{{implementation_summary}}/g, implementation_summary)
    .replace(/{{implementation_notes}}/g, implementation_notes)
    .replace(/{{tested_report}}/g, tested_report);
}
