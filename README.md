# TON Copilot Dataset

## Project Overview

TON Copilot Dataset is an initiative to create a comprehensive and continuously updated dataset for training Large Language Models (LLMs) specialized in the Telegram Open Network (TON) ecosystem. This dataset aims to serve as a foundation for developing AI-powered assistants and tools that can effectively support developers, users, and enthusiasts within the TON ecosystem.

## Installation and Usage

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ton-copilot-dataset.git
   cd ton-copilot-dataset
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

### Setting up Environment Variables

This project uses environment variables for configuration. Follow these steps to set up your environment:

1. Create a `.env` file in the root directory of the project.

2. Add your GitHub personal access token to the `.env` file:

   ```
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

   Replace `your_github_personal_access_token_here` with your actual GitHub token.

### Usage

#### Listing Repositories

To list repositories for GitHub accounts:

1. Create a file named `github_account_list.txt` in the project root directory. Add GitHub account names (users or organizations), one per line.

2. Run the following command:
   ```
   npm run list-repos
   ```

   This will generate a list of repositories in `./misc/github_repos_list.json`.

#### Cloning Repositories

To clone the repositories:

1. Ensure you have a JSON file with the repository information (e.g., `github_repos_list.json`).

2. Run the following command:
   ```
   npm run clone-repos -- /path/to/your/github_repos_list.json -o ./cloned_repos
   ```

   Replace `/path/to/your/github_repos_list.json` with the actual path to your JSON file.

   This will clone the repositories into the `./cloned_repos` directory, organized by account name.

### Additional Commands

- Format code:
  ```
  npm run format
  ```

- Check code formatting:
  ```
  npm run format:check
  ```

For more detailed information about each command, refer to the source code or run the command with the `--help` flag.

## Key Features

1. Multi-source Data Collection
   - Official documentation
   - GitHub repositories
   - Telegram group messages

2. Continuous Updates
   - Automated data ingestion from various sources
   - Regular refresh cycles to maintain relevance

3. Domain-specific Focus
   - Tailored for TON ecosystem expertise
   - Covers smart contracts, blockchain architecture, and TON-specific protocols

## Methodology for Building a Domain-Specific LLM Dataset

1. Source Identification
   - Identify authoritative and relevant data sources
   - Ensure diverse representation of content types

2. Data Collection
   - Implement web scraping for documentation and GitHub repos
   - Utilize Telegram API for group message extraction
   - Establish data collection frequency and update mechanisms

3. Data Preprocessing
   - Clean and normalize text data
   - Remove duplicates and irrelevant content
   - Standardize formatting across different sources

4. Data Annotation
   - Develop a tagging system for content categorization
   - Implement named entity recognition for TON-specific terms
   - Create a glossary of domain-specific terminology

5. Quality Assurance
   - Establish manual review processes for data accuracy
   - Implement automated checks for data integrity
   - Regularly validate dataset against expert knowledge

6. Version Control
   - Maintain dataset versioning for traceability
   - Document changes and updates between versions

7. Ethical Considerations
   - Ensure compliance with data privacy regulations
   - Obtain necessary permissions for data usage
   - Anonymize personal information in Telegram messages

8. Scalability Planning
   - Design data pipeline for handling increasing data volumes
   - Implement efficient storage and retrieval mechanisms

9. Evaluation Metrics
   - Develop benchmarks for assessing dataset quality
   - Create test sets for evaluating LLM performance on TON-specific tasks

10. Community Engagement
    - Establish feedback loops with TON developers and users
    - Incorporate community contributions and corrections

By following this methodology, the TON Copilot Dataset project aims to create a high-quality, domain-specific dataset that will enable the development of advanced AI models tailored to the TON ecosystem.



