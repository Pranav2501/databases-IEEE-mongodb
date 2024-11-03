const { MongoClient } = require('mongodb');

// MongoDB connection URI for local database
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function findPersonWithMostTweets() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('IEEE');
    const collection = database.collection('tweets');

    const topUser = await collection
      .aggregate([
        { $group: { _id: "$user.screen_name", tweetCount: { $sum: 1 } } },
        { $sort: { tweetCount: -1 } },
        { $limit: 1 }
      ])
      .toArray();

    if (topUser.length > 0) {
      console.log('Person with the most tweets:', topUser[0]._id, 'with', topUser[0].tweetCount, 'tweets');
    } else {
      console.log('No users found.');
    }
  } catch (error) {
    console.error('Error running the script:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

findPersonWithMostTweets().catch(console.error);
