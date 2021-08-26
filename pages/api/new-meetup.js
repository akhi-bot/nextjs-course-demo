import {MongoClient} from 'mongodb'
// /api/new-meetup

const handler = async (req, res) => {
    if(req.method === "POST") {
        const data = req.body;

       const client = await MongoClient.connect('mongodb+srv://userName3:7830824227@cluster0.cmune.mongodb.net/meetup?retryWrites=true&w=majority')
       const db = client.db()

       const meetupCollection = db.collection('meetup')

       const result = await meetupCollection.insertOne(data)

       console.log(result)

       client.close
       res.status(201).json({message: 'meetup data is inserted'})

    }
}

export default handler