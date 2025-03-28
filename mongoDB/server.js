const express = require("express");
const app = express();
const {MongoClient, ServerApiVersion} = require('mongodb')
const PORT = 5000;

//connecting to mongodb

const client = new MongoClient("some mongodb url", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

//function to connect
const connectDb = async () => {
    try {
        await client.connect();
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
};

//calling the function
connectDb();
app.listen(PORT, () => console.log(`server is running on port ${PORT}`)); 