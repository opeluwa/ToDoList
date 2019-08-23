const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const listController = require('../controller/list');
const checkAuth = require('../middleware/check-auth');
module.exports = router;

router.post("/newList", checkAuth, listController.newList);
router.get("/getList", checkAuth, listController.getList);
router.put("/item", checkAuth, listController.updateItem);
router.delete("/remove/:id", checkAuth, listController.removeList);
