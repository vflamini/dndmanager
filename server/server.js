const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const db = require('./config/db');

// Route to get all data
app.get("/api/get/:table", (req,res) => {
    const table = req.params.table
    db.query("SELECT * FROM ??", table, (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.get("/api/get/:table/:colname/:value", (req,res) => {
    const table = req.params.table;
    const colname = req.params.colname;
    const value = req.params.value;

    db.query(`SELECT * FROM ?? WHERE ?? = ?`, [table, colname, value], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/update/:table/:column/:value/:id", (req,res) => {
    const table = req.params.table;
    const colname = req.params.colname;
    const value = req.params.value;
    const id = req.params.id;

    db.query("UPDATE ?? SET ? WHERE ?? = ?", [table, value, column, id], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createplayer", (req,res) => {
    const full_name = req.body.full_name;
    const race = req.body.race;
    const p_class = req.body.p_class;

    db.query("INSERT INTO players (full_name, race, p_class, player_level, exp, gold) VALUES (?, ?, ?, 1, 0, 100)", [full_name, race, p_class], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/updateexp", (req,res) => {
    const full_name = req.body.full_name;
    const exp = req.body.exp;

    db.query("UPDATE players SET exp = ? WHERE full_name = ?", [exp, full_name], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/updatelevel", (req,res) => {
    const full_name = req.body.full_name;
    const level = req.body.level;

    db.query("UPDATE players SET player_level = ?, exp = 0 WHERE full_name = ?", [level, full_name], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createlocation", (req,res) => {
    const location_name = req.body.location_name;

    db.query("INSERT INTO locations (location_name) VALUES (?)", [location_name], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/updatelocationnotes/:locationname", (req,res) => {
    const location_name = req.params.locationname;
    const notes = req.body.notes;

    db.query("UPDATE locations SET notes = ? WHERE location_name = ?", [notes, location_name], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createquest", (req,res) => {
    const quest_giver = req.body.quest_giver;
    const quest_desc = req.body.quest_desc;
    const quest_origin_location = req.body.quest_origin_location;
    const completed = "No";

    db.query("INSERT INTO quests (quest_giver, quest_desc, quest_origin_location, completed) VALUES (?, ?, ?, ?)", [quest_giver, quest_desc, quest_origin_location, completed], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createshop", (req,res) => {
    const shop_name = req.body.shop_name;
    const shopkeep = req.body.shopkeep;
    const location_name = req.body.location_name;

    db.query("INSERT INTO shops (shop_name, shopkeep, location_name) VALUES (?, ?, ?)", [shop_name, shopkeep, location_name], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createitem", (req,res) => {
    const item_id = Math.floor((Math.random() * 10000) + 1);
    const item_name = req.body.item_name;
    const item_owner = req.body.item_owner;
    const effects = req.body.effects;
    const equipped = req.body.equipped;
    const item_type = req.body.item_type;
    const is_hidden = req.body.is_hidden;
    const access_diff = req.body.access_diff;
    const price = req.body.price;
    const amount = req.body.amount;
    const notes = req.body.notes;

    db.query("INSERT INTO items (item_id, item_name, item_owner, effects, equipped, item_type, is_hidden, access_diff, price, amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [item_id, item_name, item_owner, effects, equipped, item_type, is_hidden, access_diff, price, amount, notes], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/createnpc", (req,res) => {
    const full_name = req.body.full_name;
    const race = req.body.race;
    const n_class = req.body.n_class;
    const char_location = req.body.char_location;
    const notes = req.body.notes;

    db.query("INSERT INTO players (full_name, race, n_class, char_location, notes) VALUES (?, ?, ?, ?, ?)", [full_name, race, n_class, char_location, notes], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.post("/api/updateplayersavail/:table/:identifier", (req, res) => {
    const table = req.params.table;
    const identifier = req.params.identifier;
    const id_value = req.body.id_value;
    const players_avail = req.body.players_avail;

    db.query("UPDATE ? SET players_avail = ? WHERE ?? = ?", [table, players_avail, identifier, id_value], (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
