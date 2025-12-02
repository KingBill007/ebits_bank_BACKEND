const express = require('express');
const router = express.Router();
const {User} = require('../models/user');

router.get("/", async (req,res)=>{
    User.find().then((resp)=>{
        res.send(resp)
    }).catch((err)=>{
        res.send(err)
    })
})

router.post('/addUser', async (req,res)=>{
    const user = new User({
        fName: req.body.fName,
        lName:req.body.lName,
        email: req.body.email,
        password: req.body.password,
        pNumber: req.body.pNumber,
    })
    try{
        const savedUser= await user.save()
        res.status(200).json({
            Status: "Sucess",
            message: savedUser
        })
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
})



module.exports = router;