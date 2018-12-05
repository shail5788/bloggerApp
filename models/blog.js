const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  short_desc: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  image: { type: String, required: true },
  featured: { type: String, required: true },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  create_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

BlogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("blogs", BlogSchema, "blogs");
