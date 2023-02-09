const express = require("express");

const router = express.Router();
const Category = require("../models/Category")

const seedCategories = async () => {
    await Category.deleteMany({});
    return await Category.insertMany([
        {
            category: "Salary"
        },
        {
            category: "Travel"
        },
        {
            category: "Bills"
        },
        {
            category: "Education"
        },
        {
            category: "Entertainment"
        },
        {
            category: "Food"
        },
        {
            category: "Other"
        },
    ]);
}

router.get("/seed", async (_, res) => {
    res.json(await seedCategories());
});

router.get("/", async (req, res) => {
    try {
        const category = await Category.find().exec();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = router;
module.exports.seedCategories = seedCategories