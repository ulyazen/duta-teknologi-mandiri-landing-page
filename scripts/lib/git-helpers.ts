import { execSync } from "child_process";

export async function createGitBranch(branchName: string): Promise<void> {
  execSync(`git checkout -b ${branchName}`, { stdio: "inherit" });
}

export async function createWorktree(
  worktreePath: string,
  branch: string
): Promise<void> {
  // Prune stale worktrees first
  try {
    execSync("git worktree prune", { stdio: "pipe" });
  } catch {
    // ignore
  }
  execSync(`git worktree add ${worktreePath} -b ${branch} main`, {
    stdio: "inherit",
  });
}

export async function removeWorktree(worktreePath: string): Promise<void> {
  try {
    execSync(`git worktree remove ${worktreePath}`, { stdio: "inherit" });
  } catch {
    // If the worktree has local changes, force-remove
    try {
      execSync(`git worktree remove --force ${worktreePath}`, {
        stdio: "inherit",
      });
    } catch {
      // fall through
    }
  }
  try {
    execSync("git worktree prune", { stdio: "pipe" });
  } catch {
    // ignore
  }
}

export async function generateDiff(taskDir: string): Promise<string> {
  const diff = execSync("git diff HEAD", { encoding: "utf-8" });
  const fs = await import("fs/promises");
  const path = await import("path");
  const diffPath = path.join(taskDir, "03-implementation", "diff.patch");
  await fs.writeFile(diffPath, diff);
  return diffPath;
}
