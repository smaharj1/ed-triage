# Emergency Department Triage (Technical Doc) - Sujil Maharjan

This web app solves the core issues of Emergency Department Triage system: maximizing the use of available resources. This web app aims to utilize the ED resources so that all the patients get the most effective care without having to wait long hours.

The app will be used within a hospital upon notification of a catastrophic event occurring within range of that facility. This system will be the first course of action. Each user will be able to identify the staff to contact for duty, complete an assessment of patients, rating algorithm to prioritize treatment and patient progress update.

## Tech Stack

- Vue 3 (Frontend)
- Express (REST API)
- MongoDB (Database)
- Heroku (Deployment)
- Typescript

## Getting Started

To run the application locally, you need to do the following:

### Software Tools

- First make sure you have NodeJS installed in your machine (https://nodejs.org/en/download/)
- Make sure you have installed MongoDB in your machine (https://www.mongodb.com/try/download/community) You can also choose any other available options out there.
  - Make sure the port is default (27017)
  - This project uses MongoDB Atlas (https://www.mongodb.com/atlas/database) to host the Databse in cloud. You can use Atlas OR any other non-relational DBs out there.

### Application Structure

On a high level, this repo has the following structure for deploying both frontend and backend as a part of the same server

```
- client
  - package.json (client specific packages)
  - .env
  - ...source files
- server
  - package.json (server specific packages)
  - .env
  - ...source files
package.json (scripts to install and run server and client together for production or development)
```

### Secrets for Local Development

You need to create `.env` files inside of `/client` and `/server/` folders. They should have the following information:

`/client/.env`

```
VITE_ENVIRONMENT=dev
```

This is the environment variable for Vue Frontend for local development. It sets the base URL of where it should call the API.

`/server/.env`

```
MONGODB_URI=<your mongodb uri>
```

You need to set your MongoDB URI here if you want to test it in a specific remote MongoDB Server. For local machine, you can leave the value of MONGODB_URI as empty because the server will smartly pick up the local MongoDB instance.

### Installations

Run the following commands to start the application in development mode:

```
git clone https://github.gatech.edu/smaharjan30/ed-triage.git

cd ed-triage

npm install

npm run dev
```

The command above will clone the GIT repository and install all the necessary packages for web and the server to run properly. If the run was successful, you should see something similar to the following:

```
[0]
[0] > mini-project@1.0.0 watch
[0] > nodemon
[0]
[1]
[1] > client@0.0.0 dev
[1] > vite
[1]
[0] [nodemon] 2.0.20
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: ts,json
[0] [nodemon] starting `ts-node -r tsconfig-paths/register server.ts`
[1]
[1]   VITE v3.2.3  ready in 691 ms
[1]
[1]   ➜  Local:   http://127.0.0.1:5173/
[1]   ➜  Network: use --host to expose
[0] Connecting to DB...
[0] Environment is undefined
[0] App listening at http://localhost:3001 🚀
```

## Deployment

The application is deployed using Heroku (https://www.heroku.com). The app works easily with Heroku, but it might take some effort if you want to deploy it to any other cloud providers. Follow the below steps to start the remote deployment:

- Create a remote Database in https://www.mongodb.com/atlas/database

  - Signup for a `Shared` cluster since it is free for use.
  - Once you have signed up and signed into the Mongo Atlas dashboard, create a new Database by clicking on `Create` button inside `Database` tab.
  - Click on `Shared` button for a new cluster and leave all the other configurations as is.
  - If it asks for adding a new DB user, click on `Password` for Authentication Method and enter a username and password to access this DB. Leave other configurations as is. Make sure to note this information as we would need it for Heroku. If you do not see the option to add a new DB user, you can also go to `Database Access` tab and click on `Add New Database User` button.
  - Go to `Database` tab. You should see your database running. Among your `Database Deployments`, you should see your db and a `Connect` button. Click on that button.
  - Click on `Connect your application` from the options and select your driver as `Node.js`. On the connection string side you should see a mongodb connection uri starting with
    ```
    mongodb+srv://<username>:<password>@yourcluster.skjdf.mongodb.net/....
    ```
  - Copy this URI so taht we can use it later in Heroku.

- Create a heroku account if you do not have it already. https://signup.heroku.com/
- Once you have signed up, create an app with your preferred name by clicking on `New` button on top right corner.
- After the app is created, go to `Settings` Tab of your app and scroll to `Config Vars` section.
  - Add the following environment variables to it
    ```
    MONGODB_URI <value should be your own remote MongoDB server>
    VITE_ENVIRONMENT <value should be PROD>
    ```
- Clone this repository
  ```
  git clone https://github.gatech.edu/smaharjan30/ed-triage.git
  ```
- Once you are in the root of this folder, run the installation steps from above.
- Add Heroku remote to the repository

  ```
  $ heroku login

  $ git remote add heroku <link to your heroku GIT repo>
  $ git push heroku main
  ```

  You can find the heroku GIT setup under the `Deploy` tab when you first setup your app. All the detailed instructions is found there.
