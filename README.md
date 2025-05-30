# 📝 Tasky CLI App

A simple command-line To-Do application built with Node.js. Users can add, list, complete, and delete tasks interactively using Inquirer prompts, with data persistence powered by LowDB.

## 🚀 Features

- Add new tasks with title, description, priority, and optional due date.
- List all tasks in a clean table format with:
  - Priority labels
  - Relative created time (e.g., "2 days ago")
  - Human-readable due date (or "N/A")
  - Visual completion status (checkbox style)
- Mark tasks as complete.
- Delete tasks.
- Data saved locally in a JSON file (`db.json`).
- Uses UUIDs for task identification.
- Validations using Zod.
- Spinners using Ora for enhanced user experience.

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [LowDB](https://www.npmjs.com/package/lowdb)
- [Zod](https://www.npmjs.com/package/zod)
- [Day.js](https://day.js.org/)
- [Ora (spinner)](https://www.npmjs.com/package/ora)
- [cli-table3](https://www.npmjs.com/package/cli-table3)

## 📸 Preview

```bash
? What would you like to do? (Use arrow keys)
❯ Add Task
  List Tasks
  Complete Task
  Delete Task
  Exit
