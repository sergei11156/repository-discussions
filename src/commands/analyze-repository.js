import chalk from "chalk";
import inquirer from "inquirer";

export const runAnalyzeRepository = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "url",
                message: "Enter Repository URL",
            },
        ])
        .then((answers) => {

            console.log(chalk.green(`You entered, ${answers.url}!`));
        });
};
