import inquirer from "inquirer";
import db from "../db/connection.js";
import { logError, logSuccess } from "../utils/logger.js";
import { taskSchema } from "../utils/validate.js";
import dayjs from "dayjs";
import { spinner } from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";

export async function addTask() {
  try {
    const answers = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the task?",
      },
      {
        name: "description",
        type: "input",
        message: "What is the description of the task?",
      },
      {
        name: "priority",
        type: "list",
        message: "What is the priority of the task?",
        choices: [
          { name: "1 (High)", value: 1 },
          { name: "2 (Medium)", value: 2 },
          { name: "3 (Low)", value: 3 },
        ],
      },
      {
        name: "due_date",
        type: "input",
        message: "When is the due date of the task? (DD-MM-YYYY, Optional)",
        // validate field to make sure that the date is valid if not return an error
        validate: (input) => {
          if (!input) return true; // allow empty
          return (
            dayjs(input, "DD-MM-YYYY", true).isValid() || "Invalid date format!"
          );
        },
      },
    ]);

    const newTask = {
      id: uuidv4(),
      ...answers,
      createdAt: dayjs().toISOString(),
      due_date: answers.due_date
        ? dayjs(answers.due_date, "DD-MM-YYYY").toISOString()
        : undefined,
    };

    spinner.start("Validating & Adding task...");
    await new Promise((r) => setTimeout(r, 1000));
    const validatedTask = taskSchema.parse(newTask);

    // Write to the lowdb
    db.data.todos.push(validatedTask);
    await db.write();

    spinner.succeed("Task added successfully!");
    logSuccess("Task added successfully!");
  } catch (error) {
    if (error.errors) {
      logError("Validation failed:");
      error.errors.forEach((err) => logError(`• ${err.message}`));
    } else {
      logError("Something went wrong.");
      console.error(error);
    }
  }
}
