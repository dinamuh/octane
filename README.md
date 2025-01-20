----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com/dinamuh/octane.git

Switch to the repo folder

    cd octane
    
Install dependencies
* make sure that you install node 18 on your machine check this by write in command `node -v`
    - nvm use 18     "use this command in case you have more than one node version on your pc "
    - npm install

## Database
##### postgres with TypeORM
create .env file in the prodject folder with these variables  
`DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=postgres
`source this file before start the project

open `DBeaver` or any DB Viewer you want
On application start, tables for all entities will be created.

----------
## NPM scripts

- `npm run start:dev` - Start application in development mode