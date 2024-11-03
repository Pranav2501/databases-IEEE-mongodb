
# Project Overview
This project is a collection of Node.js scripts for analyzing and manipulating a dataset of tweets stored in MongoDB. The project involves counting original tweets, finding users with the most tweets, identifying users with high average retweets, and restructuring the data into separate collections for users and tweet references.

### Prerequisites
- Docker installed for running MongoDB in a container
- Node.js installed for executing scripts
- MongoDB Compass for data visualization (optional)
- MongoDB Atlas for cloud-based database setup (optional)

### Setup Instructions

#### 1. Download and Extract the Data
Download the tweets dataset generated during the 2020 IEEE VIS Conference from the following link:

[IEEE VIS 2020 Tweets](https://johnguerra.co/viz/influentials/ieeevis2020/ieeevis2020Tweets.dump.bz2)

Unzip the file using a tool like [Keka](https://www.keka.io/en/) or [7-Zip](https://www.7-zip.org/). After extraction, you should have a `.dump` file ready for import.

#### 2. Install and Run MongoDB

##### Option 1: Install MongoDB with Docker

1. **Pull the MongoDB Docker Image**:
   ```bash
   docker pull mongo:5.0-ubuntu2004
   ```

2. **Run the Image as a Container**:
   ```bash
   docker run -d -p 27017:27017 --name mongodb-container mongo:5.0-ubuntu2004
   ```
   This command maps the container port `27017` to the host port `27017`, allowing connection via `mongodb://localhost:27017`.

3. **Verify the Container is Running**:
   ```bash
   docker ps
   ```
   Ensure the status shows the container is up and running.

4. **Connect to MongoDB with `mongosh`**:
   ```bash
   mongosh --port 27017
   ```

5. **Validate Your Deployment**:
   Run the following command in `mongosh` to ensure MongoDB is active:
   ```javascript
   db.runCommand({ hello: 1 })
   ```

##### Option 2: Use MongoDB Atlas

1. **Create an Account on MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create an account.

2. **Set Up a New Cluster**:
   - Follow the steps to deploy a new free-tier cluster.

3. **Connect to the Cluster**:
   - Copy the connection string provided by Atlas (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/IEEE?retryWrites=true&w=majority`).

4. **Connect MongoDB Compass to MongoDB Atlas**:
   - Open MongoDB Compass.
   - Paste the connection string and connect.

#### 3. Connect to the Docker Instance from MongoDB Compass

1. **Ensure the Docker Container is Running**:
   - Run `docker ps` to confirm that the MongoDB container is up and running.

2. **Open MongoDB Compass**:
   - Launch MongoDB Compass on your local machine.

3. **Connect to the Docker Instance**:
   - In MongoDB Compass, enter the following connection string:
     ```
     mongodb://localhost:27017
     ```
   - Click `Connect` to establish a connection.

4. **Verify the Connection**:
   - Once connected, you should see your databases and collections, including the `IEEE` database if it has already been created.

#### 4. Import Data into MongoDB Using MongoDB Compass

1. **Open MongoDB Compass** and connect to `mongodb://localhost:27017` or your MongoDB Atlas connection string.
2. **Create a New Database**:
   - Name the database `IEEE`.
3. **Create a New Collection**:
   - Name the collection `tweets`.
4. **Import Data**:
   - Click on `Import Data` and choose your extracted `.dump` file.
   - Follow the prompts to complete the import.

### Clone the Repository
To replicate this project, clone the repository using the following command:
```bash
git clone https://github.com/Pranav2501/databases-IEEE-mongodb.git
```
Navigate to the project folder:
```bash
cd databases-IEEE-mongodb
```

### Install Dependencies
Run the following command to install all required Node.js dependencies:
```bash
npm install
```

### How to Run the Scripts

1. **Navigate to the project folder**:
   ```bash
   cd path/to/your/project
   ```

2. **Run a script**:
   ```bash
   node Query1.js
   ```

### Query Descriptions

#### Query 1: Count Non-Retweets and Non-Replies
Finds the number of tweets that are not retweets or replies.

#### Query 2: Return the Top 10 Users by Number of Followers
Identifies the top 10 users with the highest follower counts.

#### Query 3: Identify the Person with the Most Tweets
Determines the user who posted the most tweets.

#### Query 4: Top 10 People with Highest Average Retweets (After More Than 3 Tweets)
Finds the top 10 users with the highest average number of retweets, considering only those who tweeted more than 3 times.

#### Query 5: Separate User Information into a New Collection
Creates a new `users` collection containing unique user information and a `Tweets_Only` collection with references to user IDs instead of embedded user details.

