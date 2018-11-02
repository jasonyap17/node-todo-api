const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', 
        { useNewUrlParser: true }, 
        (err, client) => {
    if (err) {
        return console.log(`Database connect failed - ${err}`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5bdbe16e3e80cf34971d8f3c') },
    //         { $set: {
    //             completed: true 
    //         }}, {
    //             returnOriginal: false
    //         })
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((err) => { console.log(err); });

    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5bdb9619b4457c1b640fc57b') },
        {
            $set: {
                name: 'Anna'
            },
            $inc: {
                age: -1
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => { console.log(err); });
        
    client.close();
});
