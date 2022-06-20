import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res)=>{
    const newHotel = new Hotel(req.body); //create new entry in db

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel); //check is entry is saved
    }catch(err){
        next(err)
    }
})
//UPDATE, find by id and update
router.put("/:id", async (req, res)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true});
        res.status(200).json(updatedHotel); //check is entry is saved
    }catch(err){
       next(err)
    }
})
//DELETE
router.delete("/:id",async (req, res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel deleted successfully"); //check is entry is saved
    }catch(err){
        next(err)
    }
})
//GET
router.get("/find/:id", async (req, res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel); //check is entry is saved
    }catch(err){
        next(err)
    }
})
//GET ALL
router.get("/", async (req, res)=>{
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels); //check is entry is saved
    }catch(err){
        //res.status(500).json(err)
        next(err)
    }
})

export default router