"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = express_1.Router();
router.route('/')
    .get(users_controller_1.getUsers)
    .post(users_controller_1.createUser);
router.route('/:id')
    .get(users_controller_1.getUserById)
    .delete(users_controller_1.deleteUser)
    .put(users_controller_1.updateUser);
exports.default = router;
