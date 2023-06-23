const express = require("express");
const sellerRouter = express.Router();
const { 
    getAllSellers, 
    getSellerById, 
    addSeller, 
    updateSeller, 
    deleteSeller 
} = require("../controllers/seller-controller");

sellerRouter.get("/", getAllSellers);
sellerRouter.get('/:id', getSellerById);
sellerRouter.post('/', addSeller);
sellerRouter.put('/:id', updateSeller);
sellerRouter.delete("/:id", deleteSeller);

module.exports = sellerRouter;