const wasteCategoryController = require("../controllers/wasteCategoryController");

module.exports = app => {
    app
        .route('/waste-category') 
        .get(wasteCategoryController.getCategories)
        .post(wasteCategoryController.createCategory); 

    app
        .route('/waste-category/:categoryId') 
        .get(wasteCategoryController.getACategory)
        .put(wasteCategoryController.updateCategory) 
        .delete(wasteCategoryController.deleteCategory);
};
