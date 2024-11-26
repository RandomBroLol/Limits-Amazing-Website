const express = require('express');
const router = express.Router();

// Search items
const items = [
    { name: "Features", link: "Features.html" },
    { name: "Online Games", link: "Games.html" },
    { name: "Roblox Scripts", link: "Scripts.html" },
    { name: "Claxhome(coming soon)", link: "404.html" },
];

// Scripts API
router.get('/scripts', (req, res) => {
    res.json([
        { 
            name: "✨Limits Amazing Hub✨", 
            url: "loadstring(game:HttpGet(\"https://raw.githubusercontent.com/RandomBroLol/Random/refs/heads/main/LimitsHub\", true))()" 
        },
        { 
            name: "🔮Sirius🔮", 
            url: "loadstring(game:HttpGet(\"https://sirius.menu/sirius\", true))()" 
        },
    ]);
});

// Search API
router.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';

    // Find items that partially match the query
    const results = items.filter(item => item.name.toLowerCase().includes(query));

    if (results.length > 0) {
        res.json(results); // Respond with matching items
    } else {
        res.json({ error: "Not Found" }); // Respond with an error if no matches
    }
});

module.exports = router;
