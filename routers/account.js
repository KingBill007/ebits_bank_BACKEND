const express = require('express');
const router = express.Router();
const {Account} = require('../models/account');
const {Transaction} = require('../models/transaction');


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
        //Check if User Account type already exists
        const ifExists = await Account.exists({accType:req.body.type , userId:req.body.userId})
        if(ifExists){
            res.json({
            Sucess: false,
            message: "User already has this Account type"
            })
        } else if (!ifExists){
            //Save new account details
            const response = await Acc.save();
            res.json({
                Sucess: true,
                message: response
            })
        }
    }catch(err){
        console.log(err)
        res.json({
            Sucess: false,
            message: err
        });
    }
})

//get user details  
router.get('/checkAcc/:id', async (req,res)=>{
    const userid = req.params.id;
    try{
        const response = await Account.find({userId:userid}).populate('userId')
        res.send(response)
    }catch(err){
        res.status(500).json({
            Sucess: "false",
            message: err
        })
    }
})

//deposit money
router.post('/deposit',async (req,res)=>{
    const targetaccNo = req.body.accNumber;
    const pay = Number(req.body.amount);
    const type = req.body.accType;
    const user = req.body.userId
    try{
        const accountData = await Account.find({'accNumber':targetaccNo,"accType":type})
        const targetId = String(accountData[0]._id)
        const oldAmount = accountData[0].Value;
        const newAmount = oldAmount + pay
        //console.log('New amount:',newAmount)
        
        if (newAmount<0){//if user doesnt have enough to withraw. Error!
            res.json({
                Sucess: false,
                message: "Insufficient funds."
            });
            return;
        }
        if (isNaN(req.body.amount) || !req.body.amount){//check if amount is a number
            res.json({
                Sucess: false,
                message: "Amount must be a valid number!"
            });
        }
        //deposit function
        const updateValue = await Account.findByIdAndUpdate(
            targetId,
            {Value:newAmount},
            {new:true}
        )
        if (req.body.amout < 0){

        }
        //After Deposit record transaction history
        const history = new Transaction({
            accNumber: targetaccNo,
            userId : user,//ERROR HERE
            Value : String(req.body.amount),
            accType : type,
            description : req.body.description
        })
        const historySave = await history.save()
        console.log(historySave);
        res.json({
            Sucess:true,
            message: `New amount: ${updateValue.Value}`
        });
    }catch(err){
        res.json({
            Sucess: false,
            message: err
        });
    }
})

module.exports = router;