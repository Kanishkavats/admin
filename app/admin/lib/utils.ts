// // import mongoose from "mongoose";

// // const connection = {};

// // export const connectToDB = async () => {
// //   try {
// //     if (connection.isConnected) return;
// //     const db = await mongoose.connect(process.env.MONGODB_URI);
// //     connection.isConnected = db.connections[0].readyState;
// //   } catch (error) {
// //     console.log(error)
// //     throw new Error(error);
// //   }
// // };
import mongoose from "mongoose";

type ConnectionType = {
  isConnected?: number;
};

const connection: ConnectionType = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const db = await mongoose.connect(MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
