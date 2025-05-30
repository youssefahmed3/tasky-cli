import figlet from "figlet";
import chalk from "chalk";
export function showBanner() {
  console.clear();
  return new Promise((resolve) => {
    figlet("Tasky", (err, data) => {
      if (!err) console.log(chalk.cyan(data));
      resolve();
    });
  });
}
