import Table from "cli-table3";
import db from "../db/connection.js";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'
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
  var table = new Table({
    head: ["Title", "Description", "Priority", "Created At", "Due Date", "Completed"],
  });
  
  const todos = db.data.todos;

  todos.forEach((todo) => {
    const checkbox = todo.completed ? '☑' : '☐';
    const due_date = todo.due_date
    ? dayjs(todo.due_date).fromNow()
    : "N/A";

    const createdAt = dayjs(todo.createdAt).fromNow();

    table.push([todo.title, todo.description, convertPriority(todo.priority), createdAt, due_date, checkbox]);
  });

  console.log(table.toString());
  
}
