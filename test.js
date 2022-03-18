import 'dotenv/config';
import { GitDB } from "./index.js";

let github = new GitDB({ token: process.env.PERSONAL_TOKEN, owner: 'xrdavies', repo: 'github-db', branch: 'db' });

// github.get('test3.json', (err, res) => {
//     console.log(err);
//     console.log(res);
// })

// github.add( {d:1}, (err, res) => {
//     console.log(err);
//     console.log(res);
// })

// github.list((err, res) => {
//     console.log(err);
//     console.log(res);
// });

// github.update("99d26c869671a2412368e664a19568d4.json", {d:3}, (err, res) => {
//     console.log(err);
//     console.log(res);
// })

// github.remove("99d26c869671a2412368e664a19568d4.json", (err, res) => {
//     console.log(err);
//     console.log(res);
// })

github.list((err, res) => {
    console.log(err);
    console.log(res);
});