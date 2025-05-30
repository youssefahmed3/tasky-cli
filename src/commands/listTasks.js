import Table from "cli-table3";
import db from "../db/connection.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import inquirer from "inquirer";

dayjs.extend(relativeTime);

function convertPriority(priority) {
  switch (priority) {
    case 1:
      return "High";
    case 2:
      return "Medium";
    case 3:
      return "Low";
    default:
      return "Unknown";
  }
}

export async function listTasks() {
  const { sortBy } = await inquirer.prompt([
    {
      type: "list",
      name: "sortBy",
      message: "Sort tasks by:",
      choices: [
        { name: "Due Date", value: "due_date" },
        { name: "Created Date", value: "createdAt" },
        { name: "Priority", value: "priority" },
        { name: "Status", value: "status" },
      ],
    },
  ]);

  const todos = [...db.data.todos];

  // Sorting logic based on selected option
  todos.sort((a, b) => {
    switch (sortBy) {
      case "due_date": {
        const aDate = a.due_date
          ? new Date(a.due_date)
          : new Date(8640000000000000); // far future if not defined
        const bDate = b.due_date
          ? new Date(b.due_date)
          : new Date(8640000000000000);
        return aDate - bDate;
      }
      case "createdAt":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "priority":
        return a.priority - b.priority; // lower = higher priority
      case "status":
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1; // true before before    
      default:
        return 0;
    }
  });

  var table = new Table({
    head: [
      "Title",
      "Description",
      "Priority",
      "Created At",
      "Due Date",
      "Completed",
    ],
  });

  // const todos = db.data.todos;

  todos.forEach((todo) => {
    const checkbox = todo.completed ? "☑" : "☐";
    const due_date = todo.due_date ? dayjs(todo.due_date).fromNow() : "N/A";

    const createdAt = dayjs(todo.createdAt).fromNow();

    table.push([
      todo.title,
      todo.description,
      convertPriority(todo.priority),
      createdAt,
      due_date,
      checkbox,
    ]);
  });

  console.log(table.toString());
}
