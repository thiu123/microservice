const WasteItem = require("../models/wasteItem");
const WasteCategory = require("../models/wasteCategory");

exports.getItems = async (req, res, next) => {
  try {
    const { ids } = req.query; // Extract optional 'ids' query parameter

    let wasteItems;
    if (ids) {
      // If 'ids' parameter is provided, fetch specific waste items
      const idArray = ids.split(','); // Split comma-separated IDs into an array
      wasteItems = await WasteItem.find({ _id: { $in: idArray } });

      if (wasteItems.length !== idArray.length) {
        return res.status(404).json({ message: "Some waste items not found" });
      }
    } else {
      // If no 'ids' parameter, fetch all waste items
      wasteItems = await WasteItem.find({});
    }

    res.json(wasteItems);
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
};

// Get a waste item by Id
exports.getAItem = async (req, res, next) => {
  try {
    const wasteItem = await WasteItem.findById(req.params.itemId);
    if (!wasteItem) {
      return res.status(404).json({ message: "Waste item not found" });
    }
    res.json(wasteItem);
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
};

// Create a new waste item
exports.createItem = async (req, res) => {
  try {
    const { category, name, sortingInstructions } = req.body;

    // Check if category exists (case-insensitive)
    const wasteCategory = await WasteCategory.findOne({ 
      name: { $regex: new RegExp(`^${category}$`, "i") } 
    });
    if (!wasteCategory) {
      return res.status(404).json({ message: `Category '${category}' not found` });
    }

    // Create and save the new waste item
    const newWasteItem = new WasteItem({
      name,
      category: wasteCategory._id,
      sortingInstructions, // Include sorting instructions
    });
    const savedItem = await newWasteItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Error creating waste item", error: err });
  }
};

// Update a waste item
exports.updateItem = async (req, res, next) => {
  try {
    const updatedWasteItem = await WasteItem.findOneAndUpdate(
      { _id: req.params.itemId },
      req.body,
      { new: true } // Return updated document
    );
    if (!updatedWasteItem) {
      return res.status(404).json({ message: "Waste item not found" });
    }
    res.json(updatedWasteItem);
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
};

// Delete a waste item
exports.deleteItem = async (req, res, next) => {
  try {
    const result = await WasteItem.deleteOne({ _id: req.params.itemId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Waste item not found" });
    }
    res.json({
      message: "Waste item successfully deleted",
      itemId: req.params.itemId,
    });
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
};