import mongoose from 'mongoose';


export namespace Connection {

  export async function connect() {
    const mongoDb = process.env["MONGO_DB"] as string;
    console.log("Connecting mongoose...");
    const m = await mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected mongoose");
    
    return m;
  }

  
  export async function GetAggregatesIds(connection: typeof mongoose, prefix: string) {
    return (await connection.connection.db.collections())
      .filter(x => x.collectionName.startsWith(prefix))
      .map(x => x.collectionName.split(prefix)[1]);
  }
}
