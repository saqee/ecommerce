import mongoose from "mongoose"

async function db() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    console.log("db connect")
    return conn
  } catch (error) {
    console.log(error)
  }
}
export default db
