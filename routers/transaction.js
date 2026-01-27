const express = require('express');
const router = express.Router();
const {Transaction} = require('../models/transaction');


router.get("/getuser/:id", async (req, res)=>{
    const userid = req.params.id;

    const response = await Transaction.find({ userId: userid });
    res.json({
        Sucess: true,
        message: response
    }) 
})


module.exports = router;