# Scottish Parliament: Government Roles API
Fetching JSON data with MongoDB and NodeJS

## Dependency & Configuration
- [Express JS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
```
{
  "name": "governmentroles",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.3",
    "mongodb": "^4.5.0"
  }
}
```

### Running Server
```
nodemon app
```

Use [postman](https://www.postman.com/)


## The Endpoint List
### Get Role List
by default it will only show 10 data per page, add page=x to search specific page
- GET [/government-roles](http://localhost:3000/government-roles)
- GET [/government-roles?page=2](http://localhost:3000/government-roles?page=2)
```
   {
        "_id": "625b2b784702f2d652bf3faf",
        "ID": 1,
        "Name": "Cabinet Secretary for Commonwealth Games, Sport, Equalities and Pensioners' Rights",
        "Notes": ""
    }
```
### Get Role by _id
- GET [/government-roles/625b2b784702f2d652bf3fb8](http://localhost:3000/government-roles/625b2b784702f2d652bf3fb8)
```
{
    "_id": "625b2b784702f2d652bf3fb8",
    "ID": 10,
    "Name": "Cabinet Secretary for Health, Wellbeing and Cities Strategy",
    "Notes": ""
}
```
### Delete Role by _id
- DELETE [/government-roles/625b2b784702f2d652bf3fb8](http://localhost:3000/government-roles/625b2b784702f2d652bf3fb8)
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```
