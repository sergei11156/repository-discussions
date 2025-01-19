# repository-discussions
Analyze community activity
Create `.env` file with github token (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
and DATA_AGE_LIMIT_IN_YEARS - Data later than this value in years will not be loaded.

Example:
```
GITHUB_TOKEN=asdfasdafsdfas
DATA_AGE_LIMIT_IN_YEARS=2
```

`npm run start` - to start app

Choose 'Add repository' before loading issues and pull requests

Choose 'Load Pull Requests'/'Load Issues' to choose where to download data from.

'Analyze Issue comments count' - prints all issues with comments count more than minimum;