const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wandarlust";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected");
        await initDB();
        console.log("Database initialized");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.connection.close();
    }
}

async function initDB() {
    await Listing.deleteMany({});
    
    const listings = initData.data.map((obj) => ({
        ...obj,
        owner: "6684f33dba60dc09df26a873",
    }));

    await Listing.insertMany(listings);
}

main();