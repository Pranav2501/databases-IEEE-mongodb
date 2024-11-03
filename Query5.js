const { MongoClient } = require('mongodb');

// MongoDB connection URI for local database
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function separateUserInformation() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('IEEE');
    const tweetsCollection = database.collection('tweets');
    const usersCollection = database.collection('users');
    const tweetsOnlyCollection = database.collection('Tweets_Only');

    const users = await tweetsCollection.aggregate([
      {
        $group: {
          _id: "$user.id_str",
          screen_name: { $first: "$user.screen_name" },
          name: { $first: "$user.name" },
          followers_count: { $first: "$user.followers_count" },
          friends_count: { $first: "$user.friends_count" },
          description: { $first: "$user.description" },
          verified: { $first: "$user.verified" },
          created_at: { $first: "$user.created_at" },
        }
      }
    ]).toArray();

    if (users.length > 0) {
      await usersCollection.insertMany(users);
      console.log('Users collection created with unique users.');
    } else {
      console.log('No users found to insert.');
    }

    const tweetsCursor = tweetsCollection.find({});
    const tweetUpdates = [];

    await tweetsCursor.forEach(tweet => {
      const tweetWithoutUser = {
        ...tweet,
        user_id: tweet.user.id_str,
      };
      delete tweetWithoutUser.user;
      tweetUpdates.push(tweetWithoutUser);
    });

    if (tweetUpdates.length > 0) {
      await tweetsOnlyCollection.insertMany(tweetUpdates);
      console.log('Tweets_Only collection created without embedded user information.');
    } else {
      console.log('No tweets found to update.');
    }

  } catch (error) {
    console.error('Error running the script:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

separateUserInformation().catch(console.error);
