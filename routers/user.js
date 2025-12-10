const express = require('express');
const router = express.Router();
const {User} = require('../models/user');

router.get("/getUser/:id", async (req,res)=>{
    const userId = req.params.id;
    try{
        const user = await User.find({ _id : userId }, '-password')
        res.json({
            Sucess: true,
            message: user
        })
    }catch(err){
        res.json({
            Sucess: false,
            message: err
        })
    }
})

//create a new user
router.post('/addUser', async (req,res)=>{
    const email = req.body.email;

    const user = new User({
        fName: req.body.fName,
        lName:req.body.lName,
        email: req.body.email,
        password: req.body.password,
        pNumber: req.body.pNumber,
    })
    try{
        const emailExists = await User.exists({email:email});
        if (emailExists){
            res.json({
                Sucess: false,
                message: "Email already exists"
            })
        }else{
            const savedUser= await user.save()
            res.json({
                Status: "Sucess",
                message: "User Sucessfully Added",
                userInfo: savedUser
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
})

//Login
router.post('/login', async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password){
            res.json({
                Sucess: false,
                message: "Null Value",
            })
    }

    try{
        const emailExists = await User.exists({email:email})
        if (emailExists){
            const detailsvalid = await User.findOne({email:email,password:password});
            if (detailsvalid){
                res.json({
                    Sucess: true,
                    message: "User sucessfully validated!",
                    userId: detailsvalid._id
                })
            }else{
                res.json({
                    Sucess: false,
                    message: 'User password is invalid!'
                })
            }
        }else if(!emailExists){
            res.json({
                Sucess: false,
                message: "Email does not exist!"
            })
        }
    }catch(err){
                res.json({
                    Sucess: false,
                    message: err,
                })
    }
})



module.exports = router;