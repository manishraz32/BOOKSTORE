const express = require("express");
const customerRouter = express.Router();
const { 
        getAllCustomers, 
        getCustomerById,
        addCustomer,
        updateCustomer,
        deleteCustomer
    } = require("../controllers/customer-controller");

customerRouter.get("/", getAllCustomers);
customerRouter.get('/:id', getCustomerById);
customerRouter.post('/', addCustomer);
customerRouter.put('/:id', updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

module.exports = customerRouter;