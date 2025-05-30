import db from "../db/connection.js";
import inquirer from "inquirer";
import { logError, logSuccess } from "../utils/logger.js";

export async function deleteTask() {
  const todos = db.data.todos;

  // handling if there is not any task to be deleted
  if (todos.length === 0) {
    return logError("There is no task to be deleted");
  }

  const { selectedTask } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedTask",
      message: "Select a Task to be Deleted: ",
      choices: todos.map((task) => ({
        name: `${task.title} (${task.description})`,
        value: task.id,
      })),
    },
  ]);

  // handling if no task is selected
  if (!selectedTask) {
    logError("No task selected");
    return;
  }

  spinner.start("Deleting task...");
  await new Promise((r) => setTimeout(r, 1000));

  
  const filteredTodos = todos.filter((todo) => todo.id !== selectedTask);
  
  db.data.todos = filteredTodos;
  await db.write();
  
  spinner.succeed("Task deleted successfully !");
  logSuccess("Task deleted successfully !");
}
