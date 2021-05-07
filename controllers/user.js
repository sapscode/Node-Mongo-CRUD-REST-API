const User = require('../models/user')

const getUser = async (req, res) => {
    try{
        const user = await User.find()
        res.status(201).json(user);
    } catch(err){
        res.status(500).json({ message: err.message })
    }
};


const getUserById = async (req, res) => {
    try{
        res.status(201).json(res.user);     
    } catch(err){
        res.status(500).json({ message: err.message })
    }
};

const createUser = async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err){
        res.status(500).json({ message: err.message })
    };

};


const deleteUser = async (req, res) => {
    try {
        await res.user.remove();
        res.json({message: 'user deleted'});
    } catch(err){
        res.status(500).json({ message: err.message })
    };
    
};

const updateUser = async (req, res) => {
    if(req.body.firstname != null){
        res.user.firstname = req.body.firstname; 
    }
    if(req.body.lastname != null){
        res.user.lastname = req.body.lastname; 
    }
    if(req.body.age != null){
        res.user.age = req.body.age; 
    }
    try{
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json({ message: err.message })
    }
};

async function getUserMiddleware(req, res, next){
    let user;
    try{
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch(err) {
        res.status(500).json({ message: err.message })   
    }

    res.user = user;
    next();
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getUserMiddleware
}