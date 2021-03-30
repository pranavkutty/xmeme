# XMeme

A web-application for streaming,posting and updating memes

---
## Requirements

- For back-end development, you will only need Node.js, NPM-node package manager and mongoDB as database installed in your environment.
- Execute the `install.sh` script to install all the necessary packages and also start mongoDB server 
- You can also follow the below steps to install them individually

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

- #### `MongoDB` installation on Ubuntu
  You can find more information about the installation on the [official MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)


## Cloning this repository

    $ https://github.com/pranavkutty/xmeme.git

## Configure app

- Execute the `server_run.sh` script to install dependencies from packages.json and also start the server.

- You can also follow the below steps to configure the app and server.
- Start the mongodb server.

    $ sudo mongod

- Cd into the backend folder.

    $ cd meme-backend

- Ensure that the databse url is assigned properly in the .env file.

## Running the project

- Execute the following from the `meme-backend` folder.

    $ node server.js

<br/>

# REST API

The REST API to the memes backend is described below.

## GET the latest posted memes details

### Request

`GET /memes/`

    curl --location --request GET 'http://localhost:8081/memes'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 1355
    ETag: W/"54b-fX/ihFbmflF++1DqmbEKcHcG3eU"
    Date: Sun, 14 Feb 2021 17:11:25 GMT
    Connection: keep-alive

    []

## GET data of one particular meme

### Request

`GET /memes/:id`

    curl --location --request GET 'http://localhost:8081/memes/602401185523ab15176e6cc9'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 162
    ETag: W/"a2-IT4Ly+uMMGMOUbjIpD/rK51grec"
    Date: Sun, 14 Feb 2021 17:28:43 GMT
    Connection: close

## POST a new meme

### Request

`POST /memes/`

    curl --location --request POST 'http://localhost:8081/memes' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "name": "ashok kumar",
    "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
    "caption": "This is a meme"
    }'

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 33
    ETag: W/"21-05q7F/PfBtbvgP5VGfpz8o9AJds"
    Date: Sun, 14 Feb 2021 17:20:52 GMT
    Connection: close

    {
    "id": "60295bf49f40c9d40170ad95"
    }

## PATCH an existing meme

### Request

`PATCH /memes/:id`

    curl --location --request PATCH 'http://localhost:8081/memes/60295bb39f40c9d40170ad94' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "caption" : "update meme caption"
    }'

### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Date: Sun, 14 Feb 2021 17:24:43 GMT
    Connection: close

    {
    "id": "60295bf49f40c9d40170ad95"
    }

## DELETE an existing meme

### Request

`DELETE /memes/:id`

    curl --location --request DELETE 'http://localhost:8081/memes/60295bf49f40c9d40170ad95'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 26
    ETag: W/"1a-S0ubYs7hclR6M1QvgqNY5JoRLrM"
    Date: Sun, 14 Feb 2021 17:27:09 GMT
    Connection: close

## GET additional data(date) for latest memes

### Request

`GET /memes/date/data`

    curl --location --request GET 'http://localhost:8081/memes/date/data'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 1355
    ETag: W/"54b-fX/ihFbmflF++1DqmbEKcHcG3eU"
    Date: Sun, 14 Feb 2021 17:11:25 GMT
    Connection: keep-alive

    []
<br/>

# FRONT_END

The web-application UI is developed using simple HTML, CSS and JS. It is rendered from backend using `express.static()` function. You can access the static files at `\meme-frontend\` directory.


## USING THE WEB-APP

Once the backend server is up and running, you can go to the following url to access the frontend and start using the app.

    http://localhost:8081/
