const WasteCategory = require("../models/wasteCategory");

// Get all waste categories
exports.getCategories = async (req, res) => {
  try {
    const wasteCategories = await WasteCategory.find({});
    res.json(wasteCategories);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a waste category by Id
exports.getACategory = async (req, res) => {
  try {
    const wasteCategory = await WasteCategory.findById(req.params.categoryId);
    if (!wasteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(wasteCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new waste category
exports.createCategory = async (req, res) => {
  try {
    const newWasteCategory = new WasteCategory(req.body);
    const savedCategory = await newWasteCategory.save(); // Using async/await
    res.json(savedCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a waste category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await WasteCategory.findOneAndUpdate(
      { _id: req.params.categoryId },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a waste category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await WasteCategory.deleteOne({ _id: req.params.categoryId });
    if (deletedCategory.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({
      message: "Waste category successfully deleted",
      categoryId: req.params.categoryId,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};