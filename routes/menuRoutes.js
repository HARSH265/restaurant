const express=require('express')
const router=express.Router();
const MenuItem=require('../models/MenuItem')



router.get("/",async (req,res)=>{
    try{

      const menu=await MenuItem.find()
      res.status(200).json(menu)
    }catch(err){
      console.log("didn't get menue",err);
      res.status(500).send("error in getting menue")
    }
  })

  router.post("/", async(req,res)=>{
    try{
        const itemData =req.body;
        const newItem= new MenuItem(itemData);
        await newItem.save()
        res.status(200).json(newItem)
    }catch(err){
      console.log("error while adding item", err)
      res.status(500).send("eroor in adding items")
    }
  })

  router.get("/:tasteType", async (req, res) => {
    try {
      const taste = req.params.tasteType;
      if (taste === 'sweet' || taste === 'sour' || taste === 'spicy') {
        const item = await MenuItem.find({ taste: taste }); // Corrected line
        res.status(200).json(item);
      } else {
        res.status(404).json({ err: 'invalid taste' });
      }
    } catch (err) {
      console.log("error while searching item", err);
      res.status(500).send("not found");
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const updateItemData = req.body;
  
      const response = await MenuItem.findByIdAndUpdate(itemId, updateItemData, {
        new: true, // return the updated document
        runValidators: true // run mongoose validation
      });
  
      if (!response) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while updating the item' });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const deletedItem = await MenuItem.findByIdAndDelete(itemId); // Corrected from enuItem to MenuItem
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
  });
  
  

  module.exports = router;