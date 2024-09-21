const app =require('./app');
const express = require('express');



const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');



connectDatabase();
app.use(express.json());
app.use(cors({
    origin:"https://capstone-ecommerce-guvi.netlify.app/",
    credentials:true,
    methods:['GET', 'POST','PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}));

 const server = app.listen(process.env.PORT,() => {
    console.log(`server is running on port: ${process.env.PORT}`)
})
process.on('unhandledRejection',(err) =>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled rejection');
    server.close((err) =>{
        process.exit(1);
    })

})


process.on('uncaughtException',(err)  =>{
    console.log(`Error: ${err.message}`);
    console.log('uncaught exception handled');
    process.exit(1);
    console.log(a);

})