import chalk from 'chalk';
import ora from 'ora';

export const logSuccess = (msg) => console.log(chalk.green(msg));
export const logError = (msg) => console.log(chalk.red(msg));

export const spinner = ora();
