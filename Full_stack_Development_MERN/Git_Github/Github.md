# GitHub HandNote

Welcome to the GitHub HandNote! This handnote provides a brief overview of using GitHub for version control and collaboration.

### First Time Setup:

- Initialize a local Git repository

```
git init
```

- Add all files to the staging area

```
git add .
```

- Commit changes with a message

```
git commit -m "first commit"
```

- Rename the main branch (optional)

```
git branch -M main
```

- Add a remote repository (replace URL with your repository URL)

```
git remote add origin https://github.com/[username]/[repository-name].git
```

- Push changes to the remote repository

```
git push -u origin main
```

---

### Subsequent Changes:

- Add changes to the staging area

```
git add .
```

- Commit changes with a message

```
git commit -m "commit message"
```

- Push changes to the remote repository

```
git push
```

---

## Clone a remote branch and switch to it:

```
git checkout -b [branch_name] origin/[branch_name]
```

### Create a local copy of a remote repository:

```
git clone ssh://git@github.com/ [username] / [repository-name]
```

### Delete a remote branch

```
git push origin --delete [branch name]
```

### Push New Branch

```
git push -u origin [branch name]
```

---

## Create new repo and push previous repo's commit & tags

If you have an existing repository with some code and you want to create a new repository with the same code, including the commit history, you can follow these steps:

- **Set a repository's origin branch to SSH:**

```
git remote set-url origin <new_repository_url>
```

- **push all previous commit and tags**

```
git push -u origin --all
git push -u origin --tags
```

---

## GitHub Workflow:

- **Fork the Repository:** Click the "Fork" button on the top right of the repository page to create your copy.
- **Create Pull Requests (PR):** After making changes in your forked repository, create a PR to propose changes to the original repository.
- **Code Reviews:** Collaborators can review and comment on your code changes before merging.
- **Merge Pull Requests:** Once the changes are approved, they can be merged into the main branch.

---

- **Update local repository to the newest commit:**

```
git pull
```

- **Pull changes from remote repository:**

```
git pull origin [branch name]
```

- **Add a remote repository:**

```
git remote add origin ssh://git@github.com/[username]/[repository-name].git
```

- **Set a repository's origin branch to SSH:**

```
git remote set-url origin ssh://git@github.com/[username]/[repository-name].git
```

---

### Add Two Repo

```bash
git remote add public https://github.com/username/public-portfolio-repo.git

git remote add vercel https://github.com/username/public-portfolio-repo.git
```

### Check Remotes

You can check that both remotes (private and public) are set up by running:

```bash
git remote -v
```
