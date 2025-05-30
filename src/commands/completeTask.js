import inquirer from "inquirer";
import db from "../db/connection.js";
import { logError, logSuccess, spinner } from "../utils/logger.js";

export async function completeTask() {
  const todos = db.data.todos;

  const incompletedTasks = todos.filter((todo) => !todo.completed);

  // Handling if There is no Incompleted Tasks
  if (incompletedTasks.length === 0)
    return logError("There is no Incompleted Tasks");

  // There are Incompleted Tasks
  const { selectedTasks } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedTasks",
      message: "Select the task(s) to mark as completed: ",
      choices: incompletedTasks.map((task) => ({
        name: `${task.title} (${task.description})`,
        value: task.id,
      })),
    },
  ]);

  // No Task Selected
  if (selectedTasks.length === 0) {
    logError("No tasks selected.");
    return;
  }

  spinner.start("Completing task(s)...");
  await new Promise((r) => setTimeout(r, 1000));

  // Mark selected tasks as completed
  todos.forEach((task) => {
    if (selectedTasks.includes(task.id)) {
      task.completed = true;
    }
  });

  await db.write();

  spinner.succeed("Selected task(s) marked as completed!");

  logSuccess("Selected task(s) marked as completed!");
}
