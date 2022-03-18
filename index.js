import 'dotenv/config';
import { Octokit, App } from "octokit";
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
    } = await octokit.rest.git.getTree({ owner: "xrdavies", repo: "github-db", tree_sha: "main", branch: "" });
    console.log("get branch: ", data.tree);

    data.tree.filter(item => { return item.path.match(/json$/)});
}

// export function gitdb(options) {
//     var oct = Octokit.
// }