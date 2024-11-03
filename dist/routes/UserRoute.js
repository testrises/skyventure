"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controllers/UserController");
var router = require("express").Router();
router.post('/create', UserController_1.createUser);
router.post('/login', UserController_1.login);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map