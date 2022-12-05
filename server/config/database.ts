import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `${
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ed-triage'
}?retryWrites=true&w=majority`;

console.log(`Connecting to DB... ${process.env.MONGODB_URI}`);

connect(connectionString).catch(err =>
  console.log('MongoDB could not be connected...', err)
);

export default connection;
