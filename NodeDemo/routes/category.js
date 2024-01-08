var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelCategory = require("../models/category");
var validate = require("../validates/department");
const { validationResult } = require("express-validator");

// router.get("/", async function (req, res, next) {
//   console.log(req.query);
//   var productsAll = await modelCategory.getall(req.query);
//   responseData.responseReturn(res, 200, true, productsAll);
// });

router.get('/', async function (req, res, next) {
  try {
    var allProducts = await modelCategory.getAllCategories(req.query);
    responseData.responseReturn(res, 200, true, allProducts);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    var department = await modelCategory.getProductById(req.params.id);
    if (!department) {
      responseData.responseReturn(res, 404, false, "Products not found");
      return;
    }
    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.post("/add", validate.validate(), async function (req, res, next) {
  try {
    const { name, price, order, product_k } = req.body;
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(
        res,
        400,
        false,
        errors.array().map((error) => error.msg)
      );
      return;
    }

    const newProducts = await modelCategory.createCategory({
      name: name,
      price: price,
      order: order,
      product_k: product_k
    });

    responseData.responseReturn(res, 200, true, newProducts);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.put("/edit/:id", validate.validate(["name"]), async function (req, res, next) {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(
        res,
        400,
        false,
        errors.array().map((error) => error.msg)
      );
      return;
    }

    const updatedProducts = await modelCategory.updateProduct(
      req.params.id,
      req.body
    );

    if (!updatedProducts) {
      responseData.responseReturn(res, 404, false, "Products not found");
      return;
    }

    responseData.responseReturn(res, 200, true, updatedProducts);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const idDelete = req.params.id;
    console.log(`ID: ${idDelete}`);
    var deletedProducts = await modelCategory.deleteProduct(idDelete);
    console.log(`After delete: ${deletedProducts}`);
    
    if (!deletedProducts) {
      responseData.responseReturn(res, 404, false, "Products not found");
      return;
    }

    responseData.responseReturn(res, 200, true, "Deletion successful");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

module.exports = router;