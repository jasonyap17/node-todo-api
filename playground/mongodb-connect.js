const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', 
        { useNewUrlParser: true }, 
        (err, client) => {
    if (err) {
        return console.log(`Database connect failed - ${err}`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne(
    //     {
    //         text: 'finish course by next week',
    //         completed: false
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log(`Unable to insert Todo: ${err}`);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     }
    // )

        // db.collection('Todos').find().forEach((row) => {
        //     console.log(JSON.stringify(row, undefined, 2));            
        // }) 
        db.collection('Users').insertOne(
            {
                name: 'Janna',
                age: 13,
                location: 'CA'
            } , (err, result) => {
                if (err) {
                    return console.log(`Unable to insert User: ${err}`);
                }
                console.log(JSON.stringify(result.ops, undefined, 2));
            }
        );

    client.close();
});






// var user = { name: 'Julian' }
// var { name } = user;
// console.log(name);
// process.exit();
