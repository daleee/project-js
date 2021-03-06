## Project.js
_Project.js is the result of 8 months of work for the capstone project at Seneca College. It was developed by:_
* _[@dperit](https://github.com/dperit)_
* _[@JSilver99](https://github.com/JSilver99)_
* _[@jenmcd](https://github.com/jenmcd)_
* _[@daleee](https://github.com/daleee)_

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

The API prefix can be configured in `config/project.js`

### License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013 David Perit &lt;dperit@gmail.com>, Jennifer McDonald, 
Jesse Silver &lt;dasilverblaze@hotmail.com>, Dale Karp &lt;me@dale.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
