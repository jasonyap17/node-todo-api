const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', 
        { useNewUrlParser: true }, 
        (err, client) => {
    if (err) {
        return console.log(`Database connect failed - ${err}`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'wash dishes'})
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((err) => {console.log(err); } );
    //deleteOne
    // db.collection('Todos').deleteOne({ text: 'wash dishes' })
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((err) => { console.log(err); });


    //findOneAndDelete
            db.collection('Users').findOneAndDelete({ _id: new ObjectID('5bdba0e0993cfc2218c2aff3') })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => { console.log(err); });

    client.close();
});
