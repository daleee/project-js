## pjs-api

### Getting Started
Make sure you have the required tools:

* [Node.js](http://nodejs.org/)
* [MongoDB](http://www.mongodb.org/)

Fork and clone the repository, then change directories:
```
$ cd pjs-api
```

Install Node-specific dependencies:
```
$ npm install
```

Database sample data installation (instructions created by Jennifer)

1.  Load up the mongo shell in the console from within the project-js directory
2.  Type in the following command in your mongo client shell:  load("dummydbMar17.js")
3.  To check for success, you can type:  show collections  [the result should be: projects, roles, users]
4.  To check that all the data is there, type: db.users.find()  ...or db.roles.find() or db.projects.find()  which will display all the data in the collection.

To then upload the data to the VM, you must:

1.  Run the mongodump command. This will generate a folder called dump.
2.  Copy dump to the project-js directory on the server, overwriting the existing dump directory if there is one
3.  Delete the contents of the DB folder
4.  Run nohup mongod --dbpath db &
5.  Run mongorestore

### Using pjs-api locally
First, make sure MongoDB is running:
```
$ mongod --dbpath db
```

You can then start the server by typing:
```
$ node app
```
The client is accessible at `localhost:<port>`
The API is accessible at `localhost:<port>/api/`
The API prefix can be configured in `config/project.js`.

### Server setup

transfer files over (not db or node_modules, though)

* run npm install
* mkdir db
* perform the data import operations as dictated above
* nohup node app

Should be accessible at http://zenit.senecac.on.ca:9078

To remove the database prior to restoring it, kill the mongod process and the node process, delete everything in the DB folder,
then follow the data import steps