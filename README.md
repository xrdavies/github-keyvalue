# Github-DB

An opensource db backed by Github. Store and manage data with `json` format in repo with dedicate branch.  

It's quite convinent for CI/CD that you can just record and manage your data in github repo with github actions.

## Usage

### new GithubDB(options)
```
new GithubDB({
    token, // The personal access token of your account
    owner, // The owner of this repo
    repo, // The name of repo
    branch // The branch stores the data
})
```

`token` can be created in [settings](https://github.com/settings/tokens/new)  
`owner` is name of the owner of your database repo. For example, if I want to have a db, it should be `owner: 'xrdavies'`.  
`repo` is the name of your database repo. You can name it as you want.  
`branch` is the branch where you put your data in your repo.  

### list()
List all the available records in db.

### add(data)
Add record to db.

### get(id)
Get record according to `id`.

### update(id, data)
Update record according to `id`.

### remove(id)
Remove record according to `id`.


# Thanks to

[HubDB](https://github.com/mapbox/hubdb) is a github-powered database created by Mapbox. Thanks to their idea.