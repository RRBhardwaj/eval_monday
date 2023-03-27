const express = require("express");

const postRouter = express.Router();

const {postModel} = require("../model/post.model");

postRouter.get("/", async(req,res) => {
    const Laptop = req.query.Laptop;
    const Tablet = req.query.Tablet;
    const Mobile = req.query.Mobile;

    if(Laptop){
        try{
            let post = await postModel.find({device:Laptop});
            res.status(200).send(post);

        }catch(err){
            console.log(err);
        }
    } else if(Tablet){
        try{
            let post = await postModel.find({device:Tablet});
            res.send(post);
        }catch(err){
            console.log(err);
        }
    } else if(Mobile){
        try{
            let post = await postModel.find({device:Mobile});
            res.send(post);
        }catch(err){
            console.log(err);
        }
    }else{
        try{
            let post = await postModel.find();
            res.send(post);
        }catch(err){
            console.log(err);
        }
    }
})

postRouter.post("/add", async(req,res) => {
    const payload = req.body;
    try {
        const post_Data = new postModel(payload)
        await post_Data.save()
        res.send("Data added in database")
    } catch (err) {
        console.log(err)
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const Id = req.params.id
    const payload = req.body
    const Post= await postModel.find({"_id":Id})
    const Post_Id = Post.userID
    const req_ID = req.body.userID
    try {
        if(Post_Id!==req_ID){
            res.send("your not authorized")
        }else{
            await postModel.findByIdAndUpdate({_id:Id},payload)
            res.send("Data has been updated")
        }   
    } catch (err) {
        console.log(err)
    }

})

postRouter.delete("/delete/:id",async(req,res)=>{
    const Id = req.params.id
    const Post= await postModel.findOne({"_id":Id})
    const Post_Id = Post.userID
    const req_ID = req.body.userID
    try {
        if(Post_Id!==req_ID){
            res.send("Your not authorized")
        }else{
            await postModel.findByIdAndDelete({_id:Id})
            res.send("data has been deleted")
        } 
    } catch (err) {
        console.log(err)
    }
})