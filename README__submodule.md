Git Submodule Commands
======================

Important note: Before commiting changes to a Git submodule,
always checkout a submodule branch (otherwise the commit will
be done on a headless state).

Install a repo with a submodule:

```
git clone git@example.com:my-app.git
git submodule init
git submodule update
```

To commit changes in submodule first push the submodule repo, 
then push parent repo:

```
# Go to submodule directory
cd my-module
git checkout master
# Make changes
git commit -m "Make changes to submodule"
git push
cd ..
git add my-module
git commit -m "Update changes to submodule"
git push
```

Pull changes in submodule:

```
git pull
git submodule update
```
