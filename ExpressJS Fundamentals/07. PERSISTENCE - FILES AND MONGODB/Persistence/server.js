const MongoClient = require('mongodb').MongoClient;

const connStr = 'mongodb://localhost:27017';
const client = new MongoClient(connStr, { useNewUrlParser: true });
client.connect((err) => {
    if (err) {
        console.warn(err);
        return;
    }

    console.log('Connected successfully to server');
    const db = client.db('cars');
    const collection = db.collection('people');

    const record = {
        name: 'Desi',
        age: 22
    };

    collection.find({age: 22, name: 'Peter'})
        .toArray()
        .then((data => console.log(data)))
        .catch(e => console.log(e));

    client.close();
});