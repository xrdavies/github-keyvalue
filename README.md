# Github-Keyvalue

An opensource db backed by Github / Octkit. Store and manage data with `json` format in repo with dedicate branch. 

It's quite convinent for CI/CD that you can just record and manage your data in github repo with github actions.

## Usage

### Install

Run `npm i github-keyvalue` or `yarn add github-keyvalue` to install this package.

### new GithubKV(options)
```
new GithubKV({
    token, // The personal access token of your account (required)
    owner, // The owner of this repo (required)
    repo, // The name of repo (required)
    branch, // The branch stores the data (requied)
    path, // The path store the data (optional)
})
```

`token` can be created in [settings](https://github.com/settings/tokens/new)  
`owner` is name of the owner of your database repo. For example, if I want to have a db, it should be `owner: 'xrdavies'`.  
`repo` is the name of your database repo. You can name it as you want.  
`branch` is the branch where you put your data in your repo.  
`path` is the path store data, it's optional. The default is the root folder of repo

### list() : Promise<T | undefined>
List all the available records in db.

### add(data) : Promise<T | undefined>
Add a record to db.

### get(id) : Promise<T | undefined>
Get a record according to `id`.

### update(id, data) : Promise<T | undefined>
Update record according to `id`.

### remove(id) : Promise<T | undefined>
Remove record according to `id`.

# Use cases

[DAOPark DB](https://github.com/Web3Camp-Labs/daopark-db)

# Thanks to

[HubDB](https://github.com/mapbox/hubdb) is a github-powered database created by Mapbox.  
[githubDB](https://github.com/usmakestwo/githubDB) is a Lightweight Cloud based JSON Database with a MongoDB like API for Node.  
[Simple Github DB](https://github.com/kuldeepkeshwar/simple-github-db) is a simpe key value store using Github.  
[Issue DB](https://github.com/issue-db/issue-db) uses GitHub Issues as a JSON datastore.  
[ghkv](https://github.com/taskworld/ghkv) is a key-value store for your CI/CD workflows, backed by GitHub API.  
