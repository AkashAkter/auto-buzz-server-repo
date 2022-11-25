const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
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
        const bookingsCollection = client.db('autoBuzz').collection('bookings');
        const usersCollection = client.db('autoBuzz').collection('users');

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

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            // const query = {
            //     appointmentDate: booking.appointmentDate,
            //     email: booking.email,
            //     treatment: booking.treatment 
            // }

            // const alreadyBooked = await bookingsCollection.find(query).toArray();

            // if (alreadyBooked.length){
            //     const message = `You already have a booking on ${booking.appointmentDate}`
            //     return res.send({acknowledged: false, message})
            // }
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.find(query).toArray();
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