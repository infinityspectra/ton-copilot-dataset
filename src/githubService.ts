import { Octokit } from '@octokit/rest';
import simpleGit from 'simple-git';
import { Repo } from './types';
import * as fs from 'fs';
import * as path from 'path';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getReposForUser(username: string): Promise<Repo[]> {
  const repos: Repo[] = [];
  let page = 1;

  while (true) {
    const response = await octokit.repos.listForUser({
      username,
      per_page: 100,
      page,
    });

    if (response.data.length === 0) break;
    repos.push(
      ...response.data.map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        url: repo.clone_url || '',
      })),
    );

    page++;
  }

  return repos;
}

export async function cloneRepos(repos: Repo[], outputDir: string): Promise<void> {
  const git = simpleGit();

  for (const repo of repos) {
    const repoPath = path.join(outputDir, repo.name);
    if (!fs.existsSync(repoPath)) {
      console.log(`Cloning ${repo.fullName}...`);
      await git.clone(repo.url, repoPath, ['--branch', 'main', '--single-branch'])
        .catch(async () => {
          console.log(`Main branch not found for ${repo.fullName}, trying master...`);
          await git.clone(repo.url, repoPath, ['--branch', 'master', '--single-branch']);
        });
    } else {
      console.log(`${repo.name} already exists, skipping...`);
    }
  }
}
