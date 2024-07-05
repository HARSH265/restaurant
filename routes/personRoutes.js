const express=require('express')
const router=express.Router();
const Person = require('../models/person');
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      
      await newPerson.save();
      res.send(`Person ${newPerson.name} added successfully`);
    } catch (error) {
      res.status(500).send("Error adding person");
    }
  });
  router.get("/", async(req,res)=>{
    try{
        const users= await Person.find()
        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).send("eroor in getting users")
    }
})
router.get("/:workType", async(req,res)=>{
    try{
      const workType=req.params.workType;
      if (workType=='chef' || workType=='waiter' || workType=='manager'){
        const user= await Person.find({work:workType})
        res.status(200).json(user)
      }
      else{
        res.status(404).json({error:'invalid work type'})
      }
    }catch(err){
      console.log(err);
      res.status(404).json({error:'not found'})
    }
    
    
    
  })
  router.put('/:id', async(req,res) =>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true, //return the updated document
            runValidators:true //Run mongoose Validation
        })
            if(!response){
                return res.status(404).json({error:'Person not found'});
            }
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(404).json({error:'not found'}) 
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const deletedPerson = await Person.findByIdAndDelete(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while deleting the person' });
    }
  });
  
  

  module.exports=router