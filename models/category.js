const mongoose = require("mongoose");
const mongoosePaginated = "mongoose-paginate";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true }
});

//CategorySchema.plugin(mongoosePaginated);
module.exports = mongoose.model("category", CategorySchema, "category");
