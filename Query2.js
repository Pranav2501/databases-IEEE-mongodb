const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getTop10UsersByFollowers() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('IEEE');
    const collection = database.collection('tweets');

    console.log('Running aggregation query...');
    const top10Users = await collection
      .aggregate([
        {
          $project: {
            screen_name: "$user.screen_name",
            followers_count: "$user.followers_count"
          }
        },
        { $sort: { followers_count: -1 } },
        { $limit: 10 }
      ])
      .toArray();

    if (top10Users.length === 0) {
      console.log('No results found. Please check the field names and data structure.');
    } else {
      console.log('Top 10 Users by Followers:');
      top10Users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.screen_name} - ${user.followers_count} followers`);
      });
    }
  } catch (error) {
    console.error('Error running the script:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

getTop10UsersByFollowers().catch(console.error);
