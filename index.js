const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.a23vi3u.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const audiCollection = client.db('autoBuzz').collection('audiCars');
        const hondaCollection = client.db('autoBuzz').collection('hondaCars');
        const mercedesCollection = client.db('autoBuzz').collection('mercedesCars');

        app.get('/audis', async (req, res) => {
            const query = {};
            const result = await audiCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/hondas', async (req, res) => {
            const query = {};
            const result = await hondaCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/mercedess', async (req, res) => {
            const query = {};
            const result = await mercedesCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/audis/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await audiCollection.findOne(query);
            res.send(result);
        });

        app.get('/hondas/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hondaCollection.findOne(query);
            res.send(result);
        });

        app.get('/mercedess/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await mercedesCollection.findOne(query);
            res.send(result);
        });


    }
    finally {

    }

}
run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('Server is Running')
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})