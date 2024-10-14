const express = require('express');

const School = require('./../models/school');
const router=express.Router();





// POST route to save a person
router.get('/', (req, res) => {
    res.send("Welcome to my school");
});
 
router.delete('/people/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
  
      // Assuming you have a Person model
      const deletedPerson = await School.findByIdAndDelete(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send a success message as a JSON response
      res.json({ message: 'Person deleted successfully' });
      console.log("data deleted");
    } catch (error) {
      console.error('Error deleting person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
router.post('/people', async (req, res) => {
    try {
        const data = req.body;

        // Validate if data exists
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No data provided' });
        }

        // Assuming Person is a Mongoose model or similar ORM model
        const newPerson = new School(data);

        // Save the new person to the database
        const response = await newPerson.save();
        
        console.log('Data saved successfully');
        
        // Return the saved data in the response
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving data:', err);

        // More detailed error handling if needed
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/people', async (req, res) => {
    try {
        const persons = await School.find();
        res.json(persons);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});


router.put('/people/:id', async (req, res) => {
    const { name, work, gender } = req.body;
    const { id } = req.params;
    
    try {
        const updatedPerson = await School.findByIdAndUpdate(
            id, 
            { name, work, gender },  // Fields to update
            { new: true, runValidators: true }  // Return updated document
        );
        
        if (!updatedPerson) {
            return res.status(404).send('Person not found');
        }
        
        res.json(updatedPerson);
        console.log("document updated")
    } catch (error) {
        res.status(500).send('Error updating person');
        console.log(error)
    }
});
module.exports=router;