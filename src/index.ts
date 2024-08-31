import dotenv from 'dotenv';
import { Command } from 'commander';
import { getReposForUser, cloneRepos } from './githubService';
import { Repo } from './types';
import fs from 'fs';
import path from 'path';

dotenv.config();

const program = new Command();

program.version('1.0.0').description('GitHub repository extractor and cloner');

program
  .command('list-repos')
  .description('List repositories for GitHub accounts from github_account_list.txt')
  .action(async () => {
    try {
      const accountListPath = path.join(process.cwd(), 'misc', 'github_accounts_list.txt');
      const outputPath = path.join(process.cwd(), 'misc', 'github_repos_list.json');
      const accounts = fs.readFileSync(accountListPath, 'utf-8').split('\n').filter(Boolean);
      let allRepos: Repo[] = [];

      for (const account of accounts) {
        console.log(`Fetching repositories for ${account}...`);
        const accountRepos = await getReposForUser(account.trim());
        allRepos = allRepos.concat(accountRepos);
        console.log(`Found ${accountRepos.length} repositories for ${account}`);
      }

      console.log(`Total repositories found: ${allRepos.length}`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(allRepos, null, 2));
      console.log(`Repository list has been saved to ${outputPath}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('An error occurred:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  });

program
  .command('clone-repos')
  .description('Clone repositories from a JSON file')
  .argument('<file>', 'JSON file containing repository information')
  .option('-o, --output <directory>', 'Output directory for cloned repos', './cloned_repos')
  .action(async (file: string, options: { output: string }) => {
    try {
      console.log(`Reading file: ${file}`);
      const content = fs.readFileSync(file, 'utf-8');
      console.log('File content read successfully');

      let reposData;
      try {
        reposData = JSON.parse(content);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error('Failed to parse JSON content.');
      }

      if (!Array.isArray(reposData)) {
        throw new Error('Invalid JSON format. Expected an array of repositories.');
      }

      const repos: Repo[] = reposData.map((repo) => ({
        name: repo.name,
        fullName: repo.fullName,
        url: repo.url,
      }));

      console.log(`Cloning ${repos.length} repositories...`);

      for (const repo of repos) {
        const [account, repoName] = repo.fullName.split('/');
        const outputDir = path.join(options.output, account);

        console.log(`Cloning ${repo.fullName} to ${outputDir}...`);
        await cloneRepos([repo], outputDir);
      }

      console.log('Cloning completed successfully.');
    } catch (error) {
      console.error('An error occurred:', (error as Error).message);
    }
  });

program.parse(process.argv);
