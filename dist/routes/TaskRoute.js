"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../helpers/authentication");
var TaskController_1 = require("../controllers/TaskController");
var router = require("express").Router();
router.post('/', authentication_1.authentification, TaskController_1.createTask);
router.put('/:id', authentication_1.authentification, TaskController_1.updateTask);
router.delete('/:id', authentication_1.authentification, TaskController_1.deleteTask);
router.get('/:id', authentication_1.authentification, TaskController_1.viewTaskById);
router.get('/', authentication_1.authentification, TaskController_1.viewUserTasks);
router.put('/mass-update/:project_id/:status', authentication_1.authentification, TaskController_1.massUpdatetask);
exports.default = router;
//# sourceMappingURL=TaskRoute.js.map