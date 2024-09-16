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
      console.log(`Checking size of ${repo.fullName}...`);
      const { data: repoDetails } = await octokit.repos.get({
        owner: repo.fullName.split('/')[0],
        repo: repo.name,
      });

      if (repoDetails.size > 500000) { // size is in KB, so 500000 KB = 500 MB
        console.log(`Skipping ${repo.fullName} due to size > 500MB`);
        continue;
      }

      console.log(`Cloning ${repo.fullName}...`);
      await git.clone(repo.url, repoPath)
        .catch(async (err) => {
          console.log(`Failed to clone ${repo.fullName}: ${err.message}`);
        });
    } else {
      console.log(`${repo.name} already exists, skipping...`);
    }
  }
}
