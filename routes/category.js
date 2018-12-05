var mongoose = require("mongoose");
var Category = require("../models/category");
var config = require("../config");

exports.createCategory = (req, res) => {
  const categoryName = req.body.name;
  const category_id = req.body._id;

  if (!categoryName) {
    return res
      .status(201)
      .send({ success: false, message: "posted data is not correct" });
  } else {
    if (category_id) {
      Category.findById(category_id).exec((err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Error processing request" + err
          });
        }
        if (result) {
          result.name = categoryName;
        }
        result.save(err => {
          if (err) {
            res
              .status(502)
              .json({ success: false, message: "Updation failed" });
          }
          res
            .status(200)
            .json({ success: true, message: "category updated successfully" });
        });
      });
    } else {
      let category = new Category({
        name: categoryName
      });

      category.save(err => {
        if (err) {
          res.status(400).send({
            success: false,
            message: "Error processing request" + err
          });
        } else {
          res
            .status(200)
            .send({ success: true, message: "category added successfully " });
        }
      });
    }
  }
};
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, result) => {
    if (err) {
      res
        .status(400)
        .send({ success: false, message: "Error processing request" + err });
    } else {
      res.status(200).send(result);
    }
  });
};
