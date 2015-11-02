# Git
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Git [command line](http://git-scm.com/) software.

More complete GUIs for the command line adverse are available for [Windows](https://windows.github.com/) and [Mac](https://mac.github.com/).

## Create a new repository
```
git init
git add *.js
git commit -am "Initial load of files"
git remote add origin https://github.com/jshea/myproject.git
git push origin master
```
## Create a local copy from a remote repository
```
git clone https://github.com/jshea/myproject.git
```
## Daily life
```
git add newfile.js
git rm nolongerused.js
git status (-s)
git diff                    // compare working copy with local repo
git diff origin/master      // compare local repo with remote
git log
git commit -am "Fix SR 42"
git pull origin master
```    
## Branching/Merging
http://pcottle.github.io/learnGitBranching/
```
git branch bugFix                      // Create branch
git checkout bugFix                    // Switch to branch bugFix
   or
git checkout -b bugFix                 // Or you can create and checkout in one command

git branch                             // List branches
git branch -d branchToDelete           // Delete a branch
git diff --name-status master..branch  // List differences between master and a branch

git commit -am "Fix the wombat bug"    // Commit changes to the branch
git checkout master                    // make master our default
git merge bugFix                       // merge changes made in bugFix into master

git branch bugFix2                     // Create branch
git checkout bugFix2                   // Switch to branch bugFix
git commit -am "Fix shazbot bug"       // Commit changes to the branch
git push origin bugFix2                // Push branch to GitHub
// Create pull request via GitHub web interface
// Pull request incorporated via GitHub web interface
git push origin --delete bugFix2       // Delete branch from GitHub
```
## Tagging
```
git tag                    // Show tags
git tag Sprint-02          // Create lightweight tag "Sprint-02" from current branch
git push origin Sprint-02  // Push tag "Sprint-02" to server "origin"
```
## Misc
```
git remote -v              // Show remote repositories
```
