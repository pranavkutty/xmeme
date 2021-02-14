# XMeme

A web-application for streaming,posting and updating memes

---
## Requirements

For back-end development, you will only need Node.js, NPM-node package manager and mongoDB as database installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm


## Cloning this repository

    $ https://gitlab.crio.do/COHORT_ME_BUILDOUT_XMEME_ENROLL_1612436694845/pranavkutty13-me_buildout_xmeme.git
    $ cd pranavkutty13-me_buildout_xmeme

## Configure app

- Start the mongodb server.

    $ sudo mongod

- Cd into the backend folder.

    $ cd meme-backend

- Ensure that the databse url is assigned properly in the .env file.

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build