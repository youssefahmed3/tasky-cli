import { showBanner } from "../src/utils/banner.js";
import inquirer from "inquirer";
import { spinner } from "../src/utils/logger.js";
import { addTask } from "../src/commands/addTask.js";
import { listTasks } from "../src/commands/listTasks.js";
import { completeTask } from "../src/commands/completeTask.js";
import { deleteTask } from "../src/commands/deleteTask.js";
async function main() {
  await showBanner();

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add Task",
          "List Tasks",
          "Complete Task",
          "Delete Task",
          "Exit",
        ],
      },
    ]);

    switch (action) {
      case "Add Task":
        await addTask();
        break;
      case "List Tasks":
        while (true) {
          await listTasks();

          const { back } = await inquirer.prompt([
            {
              type: "confirm",
              name: "back",
              message: "Return to main menu?",
              default: true,
            },
          ]);

          if (back) break;
        }
        break;
      case "Complete Task":
        while (true) {
          await completeTask();

          const { back } = await inquirer.prompt([
            {
              type: "confirm",
              name: "back",
              message: "Return to main menu?",
              default: true,
            },
          ]);

          if (back) break;
        }
        break;
      case "Delete Task":
        while (true) {
          await deleteTask();

          const { back } = await inquirer.prompt([
            {
              type: "confirm",
              name: "back",
              message: "Return to main menu?",
              default: true,
            },
          ]);

          if (back) break;
        }
        break;
      default:
        process.exit(0);
    }

    await new Promise((r) => setTimeout(r, 800));
    console.clear();
  }
}

main();
