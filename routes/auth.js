const mongoose = require('mongoose'); 
const express = require('express')
const router =  express.Router();
const User = mongoose.model("User");
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const {JWT_SECRET} = require('../config/keys')
router.get('/',(req,res)=>{
    res.send('hello');
})

router.post('/signup',(req,res)=>{
    
    const {name,password,email,pic} = req.body;

    if(!name || !email || !password)
    { return res.status(422).json({error: 'Please enter all fields'})
      
}
    User.findOne({email}).then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error: 'User already exists with that email'});
        }
 bcrypt.hash(password,12).then(
     hashedPass=>{
        const user = new User({
            email,
            password:hashedPass,
            name,
            pic
        })
        user.save()
        .then(user=>{
            res.json({message: 'saved'})
        }).catch(err=>{
            res.json({
                error:err
            })
        })
    }).catch(err=>{
        res.json({error:err})
    })
})
     }
 )

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(422).json({error: "please enter email and password"})
    }
    User.findOne({email}).then(user=>{
        if(!user)
        return res.status(422).json({error:'invalid email or password'})

        bcrypt.compare(password,user.password).then(isMatch=>{
            if(!isMatch)
            return res.status(422).json({error:'invalid email or password'})
            
           const token = jwt.sign({_id:user._id},JWT_SECRET)
           const message = "successfully loggedIn";
           const {_id,name,email,followers,following,pic} = user
           res.json({token,message,user:{_id,name,email,followers,following,pic}});

           // res.json({message:"valid user"})
        })
    }).catch(err=>{
        res.json({error:err})
    })
})

router.get('/protected',requireLogin, (req,res)=>{
    res.send(`hello to protected route ${req.user}`)

})

       

module.exports = router;