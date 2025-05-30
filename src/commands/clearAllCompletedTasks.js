import db from "../db/connection.js";
import { spinner } from "../utils/logger.js";
import { logError, logSuccess } from "../utils/logger.js";

export async function clearAllCompletedTasks() {
  const todos = db.data.todos;

  const completedTasks = todos.filter((todo) => todo.completed);

  // Handling if There is no Completed Tasks
  if (completedTasks.length === 0) {
    return logError("There is no Completed Tasks");
  }

  // There are Completed Tasks
  spinner.start("Clearing all completed tasks...");
  await new Promise((r) => setTimeout(r, 1000)); // sumulating Db Fetching

  db.data.todos = todos.filter((todo) => !todo.completed);

  await db.write();

  spinner.succeed(`Cleared ${completedTasks.length} completed tasks`);

  logSuccess(`Cleared ${completedTasks.length} completed tasks`);
}
