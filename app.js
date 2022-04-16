const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()

// db connection
let db
connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/government-roles', (req,res) => {
    // current page
    const page = req.query.page || 0
    const rolesPerPage = 10

    let roles = []

    db.collection('roles')
        .find() // result = cursor [toArray, forEach]
        .sort({ID: 1})
        .skip(page * rolesPerPage)
        .limit(rolesPerPage)
        .forEach(role => roles.push(role))
        .then(() => {
            res.status(200).json(roles)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })
})

app.get('/government-roles/:id', (req,res) => {
    // check id valid or not
    if (ObjectId.isValid(req.params.id)){
        db.collection('roles')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch document'})
        })
    } else {
        res.status(500).json({error: 'Not a valid id'})
    }
})

app.post('/government-roles', (req,res) => {
    const role = req.body

    db.collection('roles')
        .insertOne(role)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new document'})
        })
})

app.delete('/government-roles/:id', (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection('roles')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not delete the document'})
        })
    } else {
        res.status(500).json({error: 'Not a valid id'})
    }
})

app.patch('/government-roles/:id', (req,res) => {
    const updates = req.body

    if(ObjectId.isValid(req.params.id)){
        db.collection('roles')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not update the document'})
            console.log(err)
        })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})