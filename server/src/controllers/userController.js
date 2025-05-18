const User = require('../models/Users')

const createUser = async (req , res) => {
    try {
        const user = await User.create(req.body)
        console.log(user);
        res.statuts(201).json(user)

    } catch (e) {
        res.statuts(400).json({ error: e.message})
    }
}

const getUsers = async (req , res) => {
    const users = await User.find()
    res.json(users)
}

const getUserById = async (req , res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(400).json({ error: 'User not found' })
        res.json(user)
    } catch (e) {
        res.status(400).json({ error: 'Invalid ID'})
    } 
}
const updateUser = async (req , res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!user) return res.status(404).json({ error: 'User not found'})
        res.json(user)
    } catch (e) {
        res.statuts(400).json({ error: e.message})
    }
}
const deleteUser = async (req , res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(400).json({ error: 'User not found'})
        res.json({ message: 'User deleted'})
    } catch (e) {
        res.status(400).json({ error: e.message})
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}