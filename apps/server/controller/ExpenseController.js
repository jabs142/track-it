const { AssertionError } = require("assert");

const express = require("express");

const router = express.Router();
const Category = require("../models/Category")
const Expense = require("../models/Expense")
const User = require("../models/User")

const seedExpenses = async () => {
    await Expense.deleteMany({})
    const adminUser = await User.findOne({ Username: 'admin' }).exec()
    const categories = await Category.find({}).exec()
    if (categories.length !== 7) {
        throw AssertionError("Should have 7 categories seeded")
    }
    return await Expense.insertMany([
        {
            title: "Income",
            category: categories[0]._id,
            description: "Year end bonus",
            date: "2022-10-31",
            amount: 3000,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[1]._id,
            description: "Vacation",
            date: "2022-10-31",
            amount: -150,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[2]._id,
            description: "Utility bills",
            date: "2022-10-15",
            amount: -120,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[3]._id,
            description: "Leetcode Premium",
            date: "2022-10-01",
            amount: -30,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[4]._id,
            description: "Netflix subscription",
            date: "2022-10-03",
            amount: -40,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[5]._id,
            description: "McDonalds Happy Meal",
            date: "2022-10-09",
            amount: -4,
            user: adminUser._id
        },
        {
            title: "Expense",
            category: categories[6]._id,
            description: "WorldVision donation",
            date: "2022-10-09",
            amount: -50,
            user: adminUser._id
        },

    ]);
}

router.get("/seed", async (req, res) => {
    res.status(200).json(await seedExpenses());

});

router.get("/expense/:id", async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.find({ user: id }).populate("category").exec();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/listexpense/:id", async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.find({ user: id })
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error });
    }
});


router.post("/create", async (req, res) => {
    const { title, category, description, date, amount, user } = req.body;
    try {
        await Expense.create(
            {
                title,
                category,
                description,
                date,
                amount,
                user
            }
        );
        res.status(200).json({ msg: 'ok' })
    } catch (error) {
        res.status(401).json('error')
    }

});

router.delete("/listexpense/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findByIdAndDelete(id);
        if (expense === null) {
            res.status(400).json(expense)
        }
        res.status(200).json({ msg: "delete" })
    } catch (error) {
        res.status(500).json({ msg: "error" })
    }
})

router.get("/listexpense/expense/:id", async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findById(id)
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    Expense.findByIdAndUpdate(id, req.body, (err, updated) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(200).json(updated);
        }
    })
})

module.exports = router;
module.exports.seedExpenses = seedExpenses;