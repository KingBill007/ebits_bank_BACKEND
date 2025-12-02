const express = require('express');
const router = express.Router();
const {Account} = require('../models/account');

router.get('/', async (req,res)=>{
    const acc = await Account.find();
    res.send(acc)
})

//create account
router.post('/create', async (req,res)=>{
    const newAccNum = Math.floor(100000000000 + Math.random() * 900000000000);
    const Acc = new Account({
        accNumber: newAccNum,
        accType: req.body.type,
        userId: req.body.userId
    })
    try{
        const response = await Acc.save();
        res.status(200).json({
            sucess: 'true',
            Message: response.data
        })
    }catch(err){
        res.status(500).send(err);
    }
})

//get user details  
router.get('/checkAcc/:id', async (req,res)=>{
    const userid = req.params.id;
    console.log(userid)
    try{
        const response = await Account.find({userId:userid}).populate('userId')
        res.send(response)
    }catch(err){
        res.status(500).json({
            sucess: "false",
            message: err
        })
    }
})

//deposit money
router.post('/deposit',async (req,res)=>{
    const targetaccNo = req.body.accNumber;
    const pay = req.body.amount;
    const type = req.body.accType
    try{
        const accountData = await Account.find({'accNumber':targetaccNo,"accType":type})
        const targetId = String(accountData[0]._id)
        const oldAmount = accountData[0].Value;
        const newAmount = oldAmount + pay
        console.log('New amount:',newAmount)
        
        if (newAmount<0){//if user doesnt have enough to withraw. Error!
            res.json({
                sucess: false,
                message: "Insufficient funds."
            });
            return;
        }
        const updateValue = await Account.findByIdAndUpdate(
            targetId,
            {Value:newAmount},
            {new:true}
        )
        res.status(200).json({
            sucess:true,
            message: `New amount: ${updateValue.Value}`
        });
    }catch(err){}
})

module.exports = router;