var mongoose = require("mongoose");
var Blog = require("../models/blog");
var config = require("../config");

exports.createBlog = (req, res) => {
  const title = req.body.title;
  const short_desc = req.body.short_desc;
  const author = req.body.author;
  const image = req.body.image;
  const category = req.body.categoryID;
  const featured = req.body.featured ? req.body.featured : "0";

  const blog_id = req.body.blog_id;
  console.log(req.body.categoryID);
  if (blog_id) {
    Blog.findById(blog_id).exec((err, blog) => {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error in process request" + err });
      }
      if (blog) {
        blog.title = title;
        blog.short_desc = short_desc;
        blog.author = author;
        blog.image = image;
        blog.categoryID = category;
        blog.featured = featured;

        blog.save(err => {
          if (err) {
            res
              .status(502)
              .json({ success: false, message: "Error in process request" });
          }
          Blog.findById(blog_id)
            .populate("catagoryID")
            .populate("author")
            .exec((err, NewBlog) => {
              if (err) {
                res.status(502).json({
                  success: false,
                  message: "Error in process request"
                });
              }
              res.status(200).json({
                success: true,
                message: "blog updated successfully",
                blog: NewBlog
              });
            });
        });
      }
    });
  } else {
    let blog = new Blog({
      title: title,
      short_desc: short_desc,
      author: author,
      image: image,
      categoryID: category,
      featured: featured
    });
    blog.save((err, newBlog) => {
      if (err) {
        res
          .status(502)
          .json({ success: false, message: "Error in process request" + err });
      }

      Blog.find({ _id: newBlog._id })
        .populate("author", "firstname lastname")
        .populate("categoryID")
        .exec((err, NewBlog) => {
          if (err) {
            res
              .status(502)
              .json({ success: false, message: "something went wrong" });
          }
          res.status(200).json({ success: true, blog: NewBlog });
        });
    });
  }
};
exports.getBlogs = (req, res) => {
  Blog.find({})
    .populate("author", "firstname lastname")
    .populate("categoryID")
    .exec((err, blogs) => {
      if (err) {
        res
          .status(502)
          .json({ success: false, message: "Internal server error" + err });
      }
      res.status(200).json(blogs);
    });
};
exports.getFeaturedBlog = (req, res) => {
  Blog.find({ featured: "1" })
    .populate("author", "firstname lastname")
    .populate("categoryID")
    .exec((err, blogs) => {
      if (err) {
        res
          .status(502)
          .json({ success: false, message: "Internal server error" + err });
      }
      res.status(200).json(blogs);
    });
};
exports.getRecentBlog = (req, res) => {
  Blog.find({})
    .sort({ _id: -1 })
    .populate("author")
    .populate("categoryID")
    .exec((err, recentBolg) => {
      if (err) {
        res
          .status(502)
          .json({ success: false, message: "Internal server error" + err });
      }
      res.status(200).json(recentBolg);
    });
};

exports.getBlogDetail = (req, res) => {
  console.log(req.params.id);
  blogID = req.params.id;
  Blog.find({ _id: blogID })
    .populate("author", "firstname lastname")
    .populate("categoryID")
    .exec((err, blogDetail) => {
      if (err) {
        res
          .status(502)
          .json({ success: false, message: "internal server error" + err });
      }

      res.status(200).json(blogDetail);
    });
};
