import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  client.connect((err) => {
    const db = client.db("band_finder");
    db.collection("song")
      .find()
      .toArray(function (err, docs) {
        // console.log(docs);
        res.status(200).json(docs);
      });
    client.close();
  });
  return {};
}
