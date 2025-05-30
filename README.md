# 📝 Tasky CLI App

A simple and interactive command-line To-Do application built with Node.js. This app allows you to manage tasks by adding, listing, completing, and deleting them, all from your terminal.

---

## 🚀 Features

- ✅ Add tasks with:
  - Title
  - Description
  - Priority (High, Medium, Low)
  - Optional Due Date
- 📋 List tasks in a table format:
  - Priority shown as labels
  - Created date shown in relative time (e.g. "1 day ago")
  - Due date in DD-MM-YYYY format or `N/A`
  - Completion status with checkboxes (☑ / ☐)
- ✔️ Mark tasks as complete
- 🗑️ Delete tasks
- 💾 Persistent storage using a local JSON file
- ✅ Validated user input using Zod
- 🔄 Spinner feedback using Ora

---

## 🧰 Tech Stack

- [Node.js](https://nodejs.org/)
- [Inquirer](https://www.npmjs.com/package/inquirer) – CLI interaction
- [LowDB](https://www.npmjs.com/package/lowdb) – JSON database
- [Zod](https://zod.dev/) – Schema validation
- [Day.js](https://day.js.org/) – Date manipulation
- [cli-table3](https://www.npmjs.com/package/cli-table3) – Display tables in terminal
- [Ora](https://www.npmjs.com/package/ora) – Loading spinners
- [UUID](https://www.npmjs.com/package/uuid) – Unique task IDs

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/youssefahmed3/tasky-cli.git
cd tasky-cli-app
```
### 2. Install All The Dependencies 

```bash
npm install
```

## Starting The App

### 1. Start The App Normally
```bash
npm run start
```

### 2. Start The App in Dev Mode (nodmon for Auto-Starting)
```bash
npm run dev
```



