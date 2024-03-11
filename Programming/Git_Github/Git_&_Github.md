# Project Name

## Git and GitHub Handnote

Welcome to the Git and GitHub Handnote! This handnote provides a brief overview of using Git and GitHub for version control and collaboration.

### Command Line Usage

#### Navigating through directories:

- **Navigate Up:**

```
cd..
```

- **Navigate Down:**

```
cd [directory_name]
```

#### Visual Studio Code Commands:

- **Open Folder:** Open the terminal in VS Code and navigate to the project folder:

```
code .
```

## Git Commands:

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

### Working with Branches:

- Create a new branch

```
git branch [branch_name]
```

- Switch to a branch

```
git checkout [branch_name]
```

- Merge a branch into the active branch

```
git merge [branch_name]
```

- Delete a local branch

```
git branch -d [branch_name]
```

- Delete a remote branch

```
git push origin --delete [branch_name]
```

- Push a branch

```
git push -u origin [branch name]
```

### Additional Git Commands:

- Check Git status

```
git status
```

- Create a new branch and switch to it

```
git checkout -b [branch_name]
```

- Clone a remote branch and switch to it

```
git checkout -b [branch_name] origin/[branch_name]
```

- Stash changes in a dirty working directory

```
git stash
```

- Remove all stashed entries

```
git stash clear
```

### GitHub Workflow:

- **Fork the Repository:** Click the "Fork" button on the top right of the repository page to create your copy.
- **Create Pull Requests (PR):** After making changes in your forked repository, create a PR to propose changes to the original repository.
- **Code Reviews:** Collaborators can review and comment on your code changes before merging.
- **Merge Pull Requests:** Once the changes are approved, they can be merged into the main branch.

## Details :

## Getting & Creating Projects

### Create a local copy of a remote repository:

```
git clone ssh://git@github.com/ [username] / [repository-name]
```

## Basic Snapshotting

- **Check status:**

```
git status
```

- **Add a file to the staging area:**

```
git add [file-name.txt]
```

- **Add all new and changed files to the staging area:**

```
git add -A
```

- **Commit changes:**

```
git commit -m "[commit message]"
```

- **Remove a file (or folder):**

```
git rm -r [file-name.txt]
```

- **Remove Git from the local machine:**

```
rm -rf .git
```

## Branching & Merging

- **List branches (the asterisk denotes the current branch):**

```
git branch
```

- **List all branches (local and remote):**

```
git branch -a
```

- **Create a new branch:**

```
git branch [branch name]
```

- **Delete a branch:**

```
git branch -d [branch name]
```

- **Delete a remote branch:**

```
git push origin --delete [branch name]
```

- **Create a new branch and switch to it:**

```
git checkout -b [branch name]
```

- **Clone a remote branch and switch to it:**

```
  git checkout -b [branch name] origin/[branch name]
```

- **Rename a local branch:**

```
  git branch -m [old branch name] [new branch name]
```

- **Switch to a branch:**

```
git checkout [branch name]
```

- **Switch to the branch last checked out:**

```
git checkout -
```

- **Discard changes to a file:**

```
git checkout -- [file-name.txt]
```

- **Merge a branch into the active branch:**

```
git checkout -- [file-name.txt]
```

- **Merge a branch into a target branch:**

```
git merge [source branch] [target branch]
```

- **Stash changes in a dirty working directory:**

```
git stash
```

- **Remove all stashed entries:**

```
git stash clear
```

## Sharing & Updating Projects

- **Push a branch to your remote repository:**

```
git push origin [branch name]
```

- **Push changes to the remote repository (and remember the branch):**

```
git push -u origin [branch name]
```

- **Push changes to the remote repository (remembered branch):**

```
git push
```

- **Delete a remote branch:**

```
git push origin --delete [branch name]
```

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

## Inspection & Comparison

- **View changes:**

```
git log
```

- **View changes (detailed):**

```
git log --summary
```

- **View changes (briefly):**

```
git log --oneline
```

- **Preview changes before merging:**

```
git diff [source branch] [target branch]
```

### Additional Resources:

- Git Documentation
- GitHub Guides
- Pro Git Book
