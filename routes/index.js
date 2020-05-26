const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const userController = require("../controllers/userController");
const apiUserController = require("../controllers/apis/userController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");
const upload = require("../configs/uploads");
/* GET home page. */

router.get("/", authController.create);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/registro", userController.create);
router.post("/registro", userController.store);

router.get("/publicar", auth, postController.create);
router.post("/publicar", upload.any(), postController.store);

router.get("/publicacao/:id/like", postController.like);

router.post("/comentar/:idPost", commentController.store);

router.get("/home", auth, postController.index);

router.get("/usuarios", apiUserController.index);
router.get("/usuarios/:id");
router.post("/usuarios", apiUserController.store);
router.put("/usuarios/:id");
router.delete("/usuarios/:id");

module.exports = router;
