import 'dotenv/config';
import { GithubDB } from "./index.js";

let db = new GithubDB({ token: process.env.PERSONAL_TOKEN, owner: 'xrdavies', repo: 'db-db', branch: 'db' });

console.log(await db.get('test2.json'));

console.log(await db.add({ d: 1 }));

console.log(await db.update("test2.json", { d: 3 }));

// db.remove("99d26c869671a2412368e664a19568d4.json", (err, res) => {
//     console.log(err);
//     console.log(res);
// })

console.log(await db.list());