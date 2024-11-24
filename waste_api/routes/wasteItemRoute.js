const wasteItemController = require("../controllers/wasteItemController");
//const verifyAut = require("../../user_api/middleware/authMiddleware");

module.exports = app => {
    app
        .route('/waste-item') 
        .get(/*verifyAut,*/ wasteItemController.getItems)
        .post(/*verifyAut,*/ wasteItemController.createItem); 

    app
        .route('/waste-item/:itemId') 
        .get(/*verifyAut,*/ wasteItemController.getAItem)
        .put(/*verifyAut,*/ wasteItemController.updateItem) 
        .delete(/*verifyAut,*/ wasteItemController.deleteItem);
};

