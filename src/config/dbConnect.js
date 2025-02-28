import mongoose, { mongo } from "mongoose";

async function consectaNaDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}
export default consectaNaDatabase;
