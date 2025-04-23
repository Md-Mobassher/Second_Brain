Welcome to the `Git HandNote!` This handnote provides a brief overview of using Git for version control and collaboration.

## Command Line Usage

#### Navigating through directories:

- **Navigate Up:**

```
cd..
```

- **Navigate Down:**

```
cd [directory_name]
```

### Visual Studio Code Commands:

- **Open Folder:** Open the terminal in VS Code and navigate to the project folder:

```
code .
```

---

- **See What feature are include now**

```
git config --list
```

- **Set User name in git**

```
git config --global user.name "Mobassher"
```

- **Set User email in git**

```
git config --global user.email "mobassherpautex@gmail.com"
```

- **See current working directory**

```
pwd
```

- **Create new file**

```
touch readme.md
```

- **See current file**

```
ls
```

- **See current file with hidden**

```
ls -a
```

- **Check git status**

```
git status
```

### Tell git to track file

- **Track single file**

```
git add <file name>
```

- **Track all file folder**

```
git add --all
```

**or**

```
git add .
```

- **commit message**

```
git commit -m "conversational commit message"
```

## See git log

- **Check commit history**

```
git log
```

- **Check commit in oneline**

```
git log --oneline
```

- **Check all log history with forward and backward move**

```
git reflog
```

### Revert

- **Go backward commit**

```
git reset --hard <backward commit id>
```

- **Check all log history with forward and backward move copy the forward commit id**

```
git reflog
```

- **Go forward commit**

```
git reset --hard <forward commit id>
```

## Create New Branch

- **See all branch**

```
git branch --list
```

- **create new**

```
git branch <branch_name>
```

- **Switch to another branch**

```
git switch <branch_name>
```

- **Add something then**

```
git add .
```

- **commit message**

```
git commit -m "<commit_message>"
```

- **merge another branch**

```
git merge <branch_name>
```

## Delete

-**Remove a file (or folder):**

```
git rm <file_name>
```

- **Delete (get warning if uncommit something)**

```
git branch -d <branch_name>
```

- **Delete ( Do not get warning if uncommit something)**

```
git branch -D <branch_name>
```

- **Remove Git from the local machine:**

```
rm -rf .git
```

## Rename existing branch

- **Before renaming you have to stay on that branch**

```
git branch -m <rename_branch>
```

## Merge conflict

```
git merge <branch_name>
```

## Git Stash

- **Check all stashes**

```
git stash --list
```

- **Create new stash**

```
git stash
```

- **Show Previous stash**

```
git stash show -p
```

- **Add last stash**

```
gut stash pop
```

- **Add specific stash**

```
git stash apply <stash_id>
```

- **Remove all stashed entries**

```
git stash clear
```

## Git ignore

- **Create git ignore file**

```
touch .gitignore
```

- **Ignore file which is already committed**

```
git rm --cached <file_name>
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
