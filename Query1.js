const { MongoClient } = require('mongodb');

// MongoDB connection URI for local database
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function countNonRetweetNonReplyTweets() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('IEEE');
    const collection = database.collection('tweets');

    const filter = {
      retweeted_status: { $exists: false }, 
      in_reply_to_status_id: null           
    };

    const count = await collection.countDocuments(filter);
    console.log('Number of tweets that are not retweets or replies:', count);
  } catch (error) {
    console.error('Error running the script:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

countNonRetweetNonReplyTweets().catch(console.error);