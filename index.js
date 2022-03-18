import 'dotenv/config';
import { Octokit, App } from "octokit";
import { queue } from 'd3-queue';
// import { Hat } from "hat";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `${process.env.PERSONAL_TOKEN}` });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// {
//     const {
//         data: { login },
//     } = await octokit.rest.users.getAuthenticated();
//     console.log("Hello, %s", login);
// }

// get content
{
    const { data } = await octokit.rest.repos.getContent({
        mediaType: {
            format: "raw",
        },
        owner: "xrdavies",
        repo: "github-db",
        path: "/README.md",
    });
    console.log(data);

    console.log("package name: %s", data);
}

// get branch
// {
//     let {
//         data
//     } = await octokit.rest.repos.getBranch({ owner: "xrdavies", repo: "github-db", branch: "main" });
//     console.log("get branch: ", data);
// }

// get tree
{
    let {
        data
    } = await octokit.rest.git.getTree({ owner: "xrdavies", repo: "github-db", tree_sha: "db", recursive: 1 });
    console.log("get tree: ", data.tree);

    let fileArray = data.tree.filter(item => { return item.path.match(/json$/) });
    console.log("json file list:", fileArray);

    let q = queue(1);
    fileArray.forEach(item => {
        q.defer( async (cb) => {
            const { data } = await octokit.rest.repos.getContent({
                mediaType: {
                    format: "raw",
                },
                owner: "xrdavies",
                repo: "github-db",
                path: item.path,
                ref: "db"
            });
            return cb(null, data);
        })
    })

    q.awaitAll((err, res) => {
        console.log('err:', err);
        console.log('res:', JSON.parse(res));
        ;
    })
}


function get(id, callback) {
    _getSHA(id, function (err, sha) {
        if (err) return callback(err);
        repo.git.blobs(sha).fetch(function (err, res) {
            if (err) return callback(err);
            callback(err, JSON.parse(atob(res.content)));
        });
    });
}


// export function gitdb(options) {
//     var oct = Octokit.
// }