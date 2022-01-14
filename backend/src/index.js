const express = require('express');
const logger =  require('morgan');
const mongodb = require('mongodb'); 
const bodyParser =  require('body-parser');
const app  =  express();
const cors = require('cors')
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json({limit: '10tb'}));
const url = 'mongodb+srv://manuel:12345@702.s3tgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port =  8000;
app.use(bodyParser.json());
app.use(logger('dev'));
const Stripe = require('stripe');


mongodb.MongoClient.connect(url, (error, database) => {
    //console.log(url);
    if(error) return process.exit(1);
    const db = database.db('products');
    //console.log("Connection is OK");

    app.get('/products',(req,res)=>{
        db.collection('products').find().toArray((error,results)=>{
            if(error) return next(error);
            res.send(results);
        });
    });

    app.post('/products',(req, res)=>{
        let newAccount =  req.body;
        db.collection('products').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.put('/products/:id',(req,res)=>{
        db.collection('products').update(
            {_id: mongodb.ObjectID(req.params.id)},
            {$set:req.body},
            (error,resutls)=>{
                if(error) console.log(error);
                res.send(resutls);
            });
    });

    app.delete('/products/:id',(req,res)=>{
        db.collection('products').remove({_id: mongodb.ObjectID(req.params.id)},(error,results)=>{
            if(error) console.log(error);
            res.send(results);
        });
    });

    app.get('/users',(req,res)=>{
        db.collection('users').find().toArray((error,results)=>{
            if(error) return next(error);
            res.send(results);
        });
    });

    app.post('/users',(req, res)=>{
        let newAccount =  req.body;
        db.collection('users').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.put('/users/:id',(req,res)=>{
        db.collection('users').update(
            {_id: mongodb.ObjectID(req.params.id)},
            {$set:req.body},
            (error,resutls)=>{
                if(error) console.log(error);
                res.send(resutls);
            });
    });

    app.delete('/users/:id',(req,res)=>{
        db.collection('users').remove({_id: mongodb.ObjectID(req.params.id)},(error,results)=>{
            if(error) console.log(error);
            res.send(results);
        });
    });

    const stripe = new Stripe('sk_test_51KDe8IB1qqz3uOspSqBs3qsaIehItIOlNnQMVayeVwcojS8rYoAHg3yPH7MsXoHOLO2YCI1Lz1hnwq3uMbQmNxL100xb84zMOC');


    app.post('/api/checkout', async(req,res)=>{
       const {id, amount} = req.body;
       const payment = await stripe.paymentIntents.create({
           amount,
           currency: "USD",
           description: "product",
           payment_method: id,
           confirm: true
       })
       console.log(payment);
       res.send("recived");
    })
    app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
});