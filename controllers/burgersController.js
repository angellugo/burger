const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log(" ------------------------ READING ------------------------ ");
  
  burger.all(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {

  console.log(" ------------------------ CREATING ------------------------ ");
  const devoured = false;
  
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, devoured
  ], function(result) {
    // Send back the ID
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const devoured = true;
  const condition = "id = " + req.params.id;

  console.log(" ------------------------ UPDATING ------------------------ ");
  console.log("condition", condition);

  burger.update({
    devoured: devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
