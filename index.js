import 'dotenv/config';
import { Octokit, App } from "octokit";
import { queue } from 'd3-queue';
import hat from "hat";
import { Base64 } from 'js-base64';

export class GithubKV {

    constructor(options) {
        this.options = options;
        this.octokit = new Octokit({ auth: `${options.token}` });
    }

    async initdb() {
        // TODO: create the db branch
    }

    async list() {
        return new Promise(async (resolve, reject) => {
            let { data: { tree } } = await this.octokit.rest.git.getTree({ owner: `${this.options.owner}`, repo: `${this.options.repo}`, tree_sha: `${this.options.branch}`, recursive: 2 });
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
                if (err) reject(err);
                resolve(res);
            })
        });
    }


    async get(id) {
        return new Promise(async (resolve, reject) => {
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
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        })

    }

    async add(data) {
        return new Promise(async (resolve, reject) => {
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
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });

    }

    async update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data: { sha } } = await this.octokit.rest.repos.getContent({
                    owner: `${this.options.owner}`,
                    repo: `${this.options.repo}`,
                    path: `${id}`,
                    ref: `${this.options.branch}`
                });

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
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async remove(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data: { sha } } = await this.octokit.rest.repos.getContent({
                    owner: `${this.options.owner}`,
                    repo: `${this.options.repo}`,
                    path: `${id}`,
                    ref: `${this.options.branch}`
                });

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
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}