// import mongoose from "../model";
import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error(
    'Please define the ATLAS_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true
    }

    cached.promise = mongoose.connect(uri, opts).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect