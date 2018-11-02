const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', 
        { useNewUrlParser: true }, 
        (err, client) => {
    if (err) {
        return console.log(`Database connect failed - ${err}`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

            // db.collection('Todos').find({ 
            //         _id: new ObjectID('5bdb924f507a0319087f8f6d')
            //     })
            //     .toArray()
            //     .then((row) => {
            //         console.log('Todos:');
            //         console.log(JSON.stringify(row, undefined, 2));            
            //     })
            //     .catch((err) => {
            //         console.log(`Unable to fetch Todos: ${err}`);
            //     });

    // db.collection('Todos').find().forEach((row) => {
    //     console.log(JSON.stringify(row, undefined, 2));            
    // }) 
            db.collection('Users').find({name: 'Janna'})
                .count()
                .then((count) => {
                    console.log(`Users count: ${count}`);
                })
                .catch((err) => {
                    console.log(`Unable to fetch Todos: ${err}`);
                });

    client.close();
});
