const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error("MONGO_URL is required. Set it in your environment or .env file.");
}
const client = new MongoClient(MONGO_URL);
const DB_NAME = "docker-db";
let db;

async function initDb() {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected successfully to server");
}

//GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const data = await db.collection("users").find({}).toArray();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch users");
    }
});

//Alias route for singular naming used in browser/manual tests
app.get("/getUser", async (req, res) => {
    try {
        const data = await db.collection("users").find({}).toArray();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch users");
    }
});

//POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        const data = await db.collection("users").insertOne(userObj);
        console.log(data);
        console.log("data inserted in DB");

        if ((req.get("accept") || "").includes("text/html")) {
            return res.redirect("/");
        }
        return res.status(201).json({ insertedId: data.insertedId });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to add user");
    }
});

app.get("/addUser", (req, res) => {
    res.redirect("/");
});

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });