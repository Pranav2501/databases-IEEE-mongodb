const { MongoClient } = require('mongodb');

// MongoDB connection URI for local database
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function findTop10PeopleWithHighestAverageRetweets() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('IEEE');
    const collection = database.collection('tweets');

    const topUsers = await collection
      .aggregate([
        {
          $group: {
            _id: "$user.screen_name",
            tweetCount: { $sum: 1 },
            totalRetweets: { $sum: "$retweet_count" }
          }
        },
        {
          $match: {
            tweetCount: { $gt: 3 } 
          }
        },
        {
          $project: {
            averageRetweets: { $divide: ["$totalRetweets", "$tweetCount"] },
            tweetCount: 1
          }
        },
        { $sort: { averageRetweets: -1 } },
        { $limit: 10 }
      ])
      .toArray();

    if (topUsers.length > 0) {
      console.log('Top 10 people with highest average retweets (tweeted more than 3 times):');
      topUsers.forEach((user, index) => {
        console.log(
          `${index + 1}. ${user._id} - Average Retweets: ${user.averageRetweets.toFixed(2)}, Total Tweets: ${user.tweetCount}`
        );
      });
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

findTop10PeopleWithHighestAverageRetweets().catch(console.error);