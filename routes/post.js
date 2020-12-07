const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,photo} = req.body;
    if(!title || !body || !photo)
   return res.status(422).json({error:"Please add all fields"})
   
   req.user.password = undefined;
   console.log(req.user);
   const post = new Post({title,body,photo,
postedBy: req.user
})
post.save().then(result=>{
    res.json({post:result})
}).catch(err=>{
    res.json({error:err})
})
})

router.get('/allpost',requireLogin,(req,res)=>{
    const post = Post.find()
    .populate('postedBy','_id name')
    .populate('comments.postedBy','_id name')
    .then(posts=>{
        res.json({
          posts
        }).catch(err=>{
            console.log(err);
        })
    });
})


router.get('/getsubpost',requireLogin,(req,res)=>{
    const post = Post.find({postedBy: {$in: req.user.following}})
    .populate('postedBy','_id name')
    .populate('comments.postedBy','_id name')
    .then(posts=>{
        res.json({
          posts
        }).catch(err=>{
            console.log(err);
        })
    });
})


router.get('/mypost',requireLogin,(req,res)=>{
    console.log(req.user)

    Post.find({postedBy: req.user._id})
    .populate('postedBy','name _id')
    .populate('postedBy',"_id name")
    .then(myPost=>{
        res.json({
            myPost
        }).catch(err=>{
           console.log(err);
        })
    })

})


router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
   Post.findOne({_id:req.params.postId})
   .populate('postedBy','_id')
   .exec((err,post)=>{
       if(err || !post)
       {
           return res.status(422).json({error:err})
       }
       if(post.postedBy._id.toString() === req.user._id.toString())
       post.remove()
       .then(result=>{
           res.json(result)
       }).catch(err=>{
           console.log(err)
       })
   })
})

router.put('/like',requireLogin,(req,res)=>{
Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new: true
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({
            error: err
        })
    })
    
    
})



router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
            $pull:{likes:req.user._id}
        },{
            new: true
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({
                error: err
            })
        })
        
    })


    router.put('/comment',requireLogin,(req,res)=>{
       const comment={
           text:req.body.text,
           postedBy: req.user._id
       }
        Post.findByIdAndUpdate(req.body.postId,{
                $push:{comments:comment}
            },{
                new: true
            })
            .populate('comments.postedBy',"_id name")
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({
                    error: err
                })
            })
            
        })


    
    


module.exports = router;