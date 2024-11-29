import ora from "ora";

export const loadPullRequestCommentsCount = async (repository) => {
    const spinner = ora('Loading repository pull requests').start()
    console.log(pulls.data.length);
    for (const pull of pulls.data) {
        const result = await octokit.rest.pulls.get({owner, repo, pull_number: pull.number})
        console.log(result.data.comments);
        break;
    }
}