import 'dotenv/config';
import { Octokit, App } from "octokit";
import { queue } from 'd3-queue';
import hat from "hat";
import { Base64 } from 'js-base64';

export class GitDB {

    constructor(options) {
        this.options = options;
        this.octokit = new Octokit({ auth: `${options.token}` });
    }

    async list(callback) {
        let { data: { tree } } = await this.octokit.rest.git.getTree({ owner: `${this.options.owner}`, repo: `${this.options.repo}`, tree_sha: `${this.options.branch}`, recursive: 2 });
        console.log(tree);
        let q = queue(1);
        tree.filter(item => { return item.path.match(/json$/) }).forEach(item => {
            q.defer(async (cb) => {
                const { data } = await this.octokit.rest.repos.getContent({
                    mediaType: {
                        format: "raw",
                    },
                    owner: `${this.options.owner}`,
                    repo: `${this.options.repo}`,
                    path: `${item.path}`,
                    ref: `${this.options.branch}`
                });
                return cb(null, { path: item.path, data: JSON.parse(data) });
            })
        })

        q.awaitAll((err, res) => {
            console.log('err:', err);
            console.log('res', res);

            if (err) return callback(err);
            return callback(null, res);
        })
    }


    async get(id, callback) {
        try {
            const { data } = await this.octokit.rest.repos.getContent({
                mediaType: {
                    format: "raw",
                },
                owner: `${this.options.owner}`,
                repo: `${this.options.repo}`,
                path: `${id}`,
                ref: `${this.options.branch}`
            });
            return callback(null, JSON.parse(data));
        } catch (error) {
            return callback(error);
        }
    }

    async add(data, callback) {
        try {
            var id = hat() + '.json';
            await this.octokit.rest.repos.createOrUpdateFileContents(
                {
                    owner: this.options.owner,
                    repo: this.options.repo,
                    path: `${id}`,
                    message: `Add ${id}`,
                    content: Base64.encode(JSON.stringify(data)),
                    branch: this.options.branch
                }
            )
            return callback(null, null);
        } catch (error) {
            return callback(error);
        }

    }

    async update(id, data, callback) {
        try {
            const { data: { sha } } = await this.octokit.rest.repos.getContent({
                owner: `${this.options.owner}`,
                repo: `${this.options.repo}`,
                path: `${id}`,
                ref: `${this.options.branch}`
            });

            console.log('sha: ', sha);

            await this.octokit.rest.repos.createOrUpdateFileContents(
                {
                    owner: this.options.owner,
                    repo: this.options.repo,
                    path: `${id}`,
                    message: `Update ${id}`,
                    sha: `${sha}`,
                    content: Base64.encode(JSON.stringify(data)),
                    branch: this.options.branch
                }
            )
            return callback(null, null);
        } catch (error) {
            return callback(error);
        }
    }

    async remove(id, callback) { 
        try {
            const { data: { sha } } = await this.octokit.rest.repos.getContent({
                owner: `${this.options.owner}`,
                repo: `${this.options.repo}`,
                path: `${id}`,
                ref: `${this.options.branch}`
            });

            console.log('sha: ', sha);

            await this.octokit.rest.repos.deleteFile(
                {
                    owner: this.options.owner,
                    repo: this.options.repo,
                    path: `${id}`,
                    message: `Remove ${id}`,
                    sha: `${sha}`,
                    branch: this.options.branch
                }
            )
            return callback(null, null);
        } catch (error) {
            return callback(error);
        }
    }

}