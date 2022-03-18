import 'dotenv/config';
import { GitDB } from "./index.js";

let github = new GitDB({ token: process.env.PERSONAL_TOKEN, owner: 'xrdavies', repo: 'github-db', branch: 'db' });

console.log(await github.get('test2.json'));

console.log(await github.add({ d: 1 }));

console.log(await github.update("test2.json", { d: 3 }));

// github.remove("99d26c869671a2412368e664a19568d4.json", (err, res) => {
//     console.log(err);
//     console.log(res);
// })

console.log(await github.list());