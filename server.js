var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
var jwt = require("jsonwebtoken");
var config = require("./config");
var user = require("./routes/user.js");
var expense = require("./routes/expense.js");
var category = require("./routes/category");
var blog = require("./routes/blog");
var os = require("os-utils");
var port = process.env.PORT || config.serverport;
mongoose.Promise = require("bluebird");

mongoose.connect(
  config.database,
  { useMongoClient: true },
  function(err) {
    if (err) {
      //console.log('Error connecting database, please check if MongoDB is running.');
    } else {
      console.log("Connected to database...");
    }
  }
);
var storage = multer.diskStorage({
  // destino del fichero
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  // renombrar fichero
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
process.on("exit", function(code) {
  // Following code will never execute.
  setTimeout(function() {
    console.log("This will not run");
  }, 0);
  console.log("About to exit with code:", code);
});

var upload = multer({ storage: storage });
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require('body-parser').json({ type : '*/*' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// use morgan to log requests to the console
app.use(morgan("dev"));
// Enable CORS from client-side
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", function(req, res) {
  res.send("Expense Watch API is running at http://localhost:" + port + "/api");
});
app.post("/register", user.signup);
// express router
var apiRoutes = express.Router();
app.use("/api", apiRoutes);

apiRoutes.post("/login", user.login);
apiRoutes.get("/blogs", blog.getBlogs);
apiRoutes.get("/blog/:id", blog.getBlogDetail);
apiRoutes.get("/recent-blog", blog.getRecentBlog);
apiRoutes.get("/feature-blogs", blog.getFeaturedBlog);
apiRoutes.get("/get-categories", category.getCategories);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token
// authenticated routes
apiRoutes.get("/", function(req, res) {
  res.status(201).json({ message: "Welcome to the authenticated routes!" });
});
apiRoutes.get("/user/:id", user.getuserDetails); // API returns user details
apiRoutes.get("/user-list", user.getUserList);
apiRoutes.post("/upload-image", upload.array("image", 1), function(
  req,
  res,
  next
) {
  res.status(200).json({ status: true, file: req.files[0] });
});
apiRoutes.post("/user-update", user.updateUser); // API updates user details
apiRoutes.put("/profile-update/:id", user.userProfileUpdate);
apiRoutes.put("/password/:id", user.updatePassword); // API updates user password

apiRoutes.post("/add-category", category.createCategory);

apiRoutes.put("/update-category", category.createCategory);

//apiRoutes.get("/blogs", blog.getBlogs);
apiRoutes.post("/create-blog", blog.createBlog);
apiRoutes.put("/update-blog", blog.createBlog);

// kick off the server
app.listen(port);
console.log("Expense Watch app is listening at http://localhost:" + port);
