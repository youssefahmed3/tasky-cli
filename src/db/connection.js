import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path';

const file = join(`${process.cwd()}/src/db`, 'db.json'); //dynamic path to db
const adapter = new JSONFile(file);
const db = new Low(adapter, { todos: [] }); // init the file with a default value

// Read file and merges with the default
await db.read();

await db.write();

export default db;
