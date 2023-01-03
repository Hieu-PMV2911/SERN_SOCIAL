const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const db = require('./models/index.js');

// import file router
const Auth = require('./controllers/auth.js');
const Friends = require('./controllers/users.js');
const Posts = require('./controllers/post.js');


// CONFIGURATIONS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE ======================================
const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, 'public/assets');
	},
	filename: (req, file, cb)=>{
		cb(null, file.originalname);
	}
});

const upload = multer({storage});

// ROUTER WITH FILE ==================================
const PORT = process.env.PORT || 6001;

db.sequelize.sync().then(() =>{
	app.listen(PORT, () => {
		console.log(`Example app listening on port ${PORT}`)
	})
})

// USE ROUTER

app.use('/auth', upload.single("picture"), Auth);
app.use('/addFriends', upload.single("picture"), Friends);
app.use('/post', upload.single("picture"), Posts);

