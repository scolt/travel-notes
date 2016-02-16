Steps to start:
1.Set up environment.
------------------------

1.1.Install git and nodejs(verion 5.* required). If npm version lower than 3.*, run npm i -g npm.

1.2.Install babel using command:
npm i -g babel-cli
or
npm i babel-core
Install eslint(npm i eslint), react(npm i react), karma(npm i karma, 
for command line interface : npm i -g karma cli), webpack(npm i webpack).

If you have trouble with karma or webpack(may be when using windows), then run
npm i -g karma-cli
npm i -g webpack
npm i -g webpack-dev-server

1.3.Clone project repository(git clone git@bitbucket.org:emp2016/emp.git). If it is necessary, create a public SSH key
(howto: https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html,
https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key ).

1.4.Go to the branch "trunk". To get the latest changes, use git fetch and git rebase origin/trunk.
Now you should have current version of project. To run it, write webpack-dev-server in command line. Open this link
in browser to see: http://localhost:8080

2.Merging.
------------------------

2.1.To merge someone branch, you must to review changes in it, and if you agree with everything, approve pull request.

2.2.When pull request is approved by every member of the team, this branch can be merged into your local trunk branch.
Click "Merge" button and once again click "Merge" in modal.
 
3.Work with tasks.
------------------------
 
3.1.In Bitbucket choose your task and change it status to "open".

3.2.Make sure that you have up-to-date version of trunk(else look for 1.4). Create new branch for your task
(name convention: fe/<task_number>_<task_description>, for example fe/#4_add_description_of_git_flow_to_readme).

3.3.After finish working on this task, add your changes to index(git add. -A), commit your changes(git commit -m
"fixes <task_number>").

3.4.Find your branch in Bitbucket and add pull request for it. Also check the checkbox to remove branch after merge.
