Steps to start:

1.Set up environment.
------------------------

1.1.Install git and nodejs(verion 5.* required). If npm version lower than 3.*, run `npm i -g npm`.

1.2.You can install required packages using "npm i" command, if you have cloned repository before. When package.json file is changed,
you also must run "npm i". Also you can install packages manually.
Install babel using command:
`npm i -g babel-cli`
or
`npm i babel-core`

Install:

 - eslint - `npm i eslint`
 - react - `npm i react`
 - karma - `npm i karma`

for command line interface:

 - karma - `npm i -g karma-cli`
 - webpack - `npm i webpack`

If you have trouble with karma or webpack(may be when using windows), then run

    npm i -g karma-cli
    npm i -g webpack
    npm i -g webpack-dev-server

1.3.Clone project repository(git clone git@bitbucket.org:emp2016/emp.git). If it is necessary, create a public SSH key
([how](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) [to](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)). After that run npm i, if you haven't required packages or
if package.json file changed.

1.4.Go to the branch "trunk". To get the latest changes, use git fetch and git rebase origin/trunk.
Now you should have current version of project. To run it, write `webpack-dev-server` in command line. Open this link
in browser to see: `http://localhost:8080`

2.Merging.
------------------------

2.1.To merge someone branch, you must to review changes in it, and if you agree with everything, approve pull request.

2.2.When pull request is approved by every member of the team, this branch can be merged into your local trunk branch.
Click "Merge" button and once again click "Merge" in modal.

3.Work with tasks.
------------------------

3.1.In Bitbucket choose your task and change it status to "open".

3.2.Make sure that you have up-to-date version of trunk(else look for 1.4). Create new branch for your task
(name convention: `fe/<task_number>_<task_description>`, for example `fe/#4_add_description_of_git_flow_to_readme`).

3.3.After finish working on this task, add your changes to index(`git add. -A`), commit your changes(`git commit -m
"fixes <task_number>"`).

3.4.Find your branch in Bitbucket and add pull request for it. Also check the checkbox to remove branch after merge.

4.Integration with Heroku.
------------------------
4.1 Register on Heroku (https://heroku.com/)

4.2 Install heroku toolbelt (https://toolbelt.heroku.com/)
If you using cloud9 just run:

    wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh

4.3 Login to Heroku:

    heroku login

4.4 Add ssh key:

    heroku keys:add

4.5 Add heroku repository to remote repositories:

    git remote add heroku https://git.heroku.com/travelnote.git

4.6 Set `NODE_ENV=production` and `NPM_CONFIG_PRODUCTION=false` using web interface or by running:

    heroku config:set NODE_ENV=production

    heroku config:set NPM_CONFIG_PRODUCTION=false

4.7 For deploy run git push heroku <branch_name>:master, for example:

    git push heroku trunk:master

or

    git push heroku be/#15_add_integration_with_heroku:master

5. Documentation
------------------------

5.1 Create (/restApi/notes.json/create)

    Default field isDel should be set to false

    payload: {
        data: Object
    }

    Returned data:

        error: object with error string
        success: {
            id: String
        }

5.2 Read (/restApi/notes.json/read)

    payload: {
        id: String,
        page: Number,
        limit: Number,
        filters: Object // like {userId: String},
        order: Object // like {fieldName: {index: 1, direction: 'ASC'} }
    }

    Returned data:

        error: object with error string
        success: {
            total: Number,
            page: Number,
            pages: Number,
            limit: Number,
            result: Array
        }

5.3 Update (/restApi/notes.json/read(/:id))

    payload: {
        id: String,
        data: Object
    }

    Returned data:

        error: object with error string
        success: {
            id: String
        }

5.4 Delete (/restApi/notes.json/delete(/:id))

    Should set flag isDel to true

    payload: {
        id: String
    }

    Returned data:

        error: object with error string
        success: {
            id: String
        }

6. Data schemes
------------------------

6.1 Notes

    Note {
        text: String, // full text of note
        title: String,
        userId: String,
        subtitle: String,
        photos: String[],
        lng: Number,
        lat: Number,
        isDel: Boolean,
        isDraft: Boolean,
        updated: Date,
        created: Date
    }

    Rates {
        userId: String,
        noteId: String,
        rate: Number
    }

    (deprecated) Notes2Images {
        imageId: String,
        noteId: String
    }

6.2 Users

    Users {
        imageId: String,
        email: String,
        username: String,
        firstName: String,
        lastName: String,
        text: String,
        isAdmin: boolean,
        isModerator: boolean,
        isDel: boolean,
        isBan: boolean
    }

6.3 Comments

    Comments {
        userId: String,
        noteId: String,
        text: String,
        updated: Date,
        created: Date,
        parentId: String,
        isDel: boolean
    }

6.4 Images

    Images {
        type: String,
        preview: String,
        image: String,
        isDel: boolean,
        alt: String
        lng: Number,
        lat: Number,
    }
 
7. Phonegap configuration
-------------------------

7.1 Install android SDK

    1. Open https://developer.android.com/studio/index.html and download SDK
    2. After install run manager and try update all default selected components, also choose version android for build API 23
    3. Add path for `platform-tools` and `tools` to your global PATH 
    4. If need add path for `java` to your global PATH
    
7.2 Install Phonegap
    
    npm i -g phonegap
    
7.3 Build android app
    
    1. Run webpack for production
    2. Copy all files from "public" directory to "_native/phonegap/www"
    3. Open command tool for directory "_native/phonegap"
    4. Run "phonegap build android"
    5. Build will be available by "_native\phonegap\platforms\android\build\outputs\apk"
    
7.4 Emulation
    
    * For emulation we can use default android emulator provided by SDK.
    * But in other point we can use https://www.genymotion.com/ (need register, free for personal use)
    
    Second point use Virtual Box and works fastly.
    
8. Electron build
-----------------

8.1 Install electron

    npm i -g electron

8.2 Install electron packager tool

    npm i -g electron-packager
    
8.3 Prepare before build
    
    1. Copy all files from "public" directory to "_native/electron"
    2. Check that app is working (run electron .)
    3. Run `npm install`
    4. Run `npm run build`
    
9. Bug tracking
---------------
Oh, we are ashamed and want to fix it asap! 

But before fixing a bug we need to reproduce and confirm it. 

In order to reproduce bugs we will systematically ask you to provide a minimal reproduce scenario (step by step).
