"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../helpers/authentication");
var ProjectController_1 = require("../controllers/ProjectController");
var router = require("express").Router();
router.post('/', authentication_1.authentification, ProjectController_1.createProject);
router.put('/:id', authentication_1.authentification, ProjectController_1.updateProject);
router.delete('/:id', authentication_1.authentification, ProjectController_1.deleteProject);
router.get('/:id', authentication_1.authentification, ProjectController_1.viewProjectById);
router.get('/:id/list', authentication_1.authentification, ProjectController_1.viewUserProjects);
exports.default = router;
//# sourceMappingURL=ProjectRoute.js.map