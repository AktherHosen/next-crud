const { MongoClient, ServerApiVersion } = require("mongodb");

let client;
let db;

const connectDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // Establish connection and wait for completion
    await client.connect();
    db = client.db("next-crud");
    console.log("Connected to MongoDB successfully");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow error for handling in the calling function
  }
};

// Export the connection function as default
export default connectDB;
