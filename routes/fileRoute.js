const express = require("express");
const file_router = express.Router();
const uploader = require("../multer/multer");
const cloudinary = require("../cloudinary/cloudinary").v2;
const bodyparser = require("body-parser");
const Filemodel = require("../models/file");
file_router.use(bodyparser.json());

file_router.post("/fileupload", uploader.single("file"), async (req, res) => {
  try {
    const upload = await cloudinary.uploader.upload(req.file.path);
    const files = await Filemodel.create({
      name: req.body.name,
      file: upload.secure_url,
      user: req.user,
    });
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
});

file_router.get("/fileupload", async (req, res) => {
  try {
    const files = await Filemodel.find({ user: req.user });
    if (files.length) {
      res.status(200).json({
        status: "success",
        files,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "page not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});
file_router.put("/fileupload/:id", async(req, res)=>{
  try{
    const fileById = await Filemodel.findOne({_id:req.params.id})
    if(fileById){
    const update = await Filemodel.updateOne({_id:req.params.id}, {$set:{name:req.body.name}})
    res.status(200).json({
      status:"ok",
      update
    })
  }else{
    res.status(404).json({
      status:"file does not found with this id"
    })
  }
  }catch(e){
    message:e.message
  }
})

file_router.delete("/fileupload/:id", async(req, res)=>{
  try{
    const fileById = await Filemodel.findOne({_id:req.params.id})
    if(fileById){
    await Filemodel.deleteOne({_id:req.params.id})
    res.status(204).json({
      status:"ok",
    })
  }else{
    res.status(404).json({
      status:"file does not found with this id"
    })
  }
  }catch(e){
    message:e.message
  }
})
module.exports = file_router;
