var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelDepartment = require("../models/department");
var validate = require("../validates/department");
const { validationResult } = require("express-validator");

// router.get("/", async function (req, res, next) {
//   console.log(req.query);
//   var productsAll = await modelDepartment.getall(req.query);
//   responseData.responseReturn(res, 200, true, productsAll);
// });

router.get('/', async function (req, res, next) {
  try {
    var allDepartments = await modelDepartment.getAllDepartments(req.query);
    responseData.responseReturn(res, 200, true, allDepartments);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    var department = await modelDepartment.getDepartmentById(req.params.id);
    if (!department) {
      responseData.responseReturn(res, 404, false, "Department not found");
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
    const { name } = req.body;
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

    const newDepartment = await modelDepartment.createDepartment({
      name: name
    });

    responseData.responseReturn(res, 200, true, newDepartment);
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

    const updatedDepartment = await modelDepartment.updateDepartment(
      req.params.id,
      req.body
    );

    if (!updatedDepartment) {
      responseData.responseReturn(res, 404, false, "Department not found");
      return;
    }

    responseData.responseReturn(res, 200, true, updatedDepartment);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const idDelete = req.params.id;
    console.log(`ID: ${idDelete}`);
    var deletedDepartment = await modelDepartment.deleteDepartment(idDelete);
    console.log(`After delete: ${deletedDepartment}`);
    
    if (!deletedDepartment) {
      responseData.responseReturn(res, 404, false, "Department not found");
      return;
    }

    responseData.responseReturn(res, 200, true, "Deletion successful");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

module.exports = router;