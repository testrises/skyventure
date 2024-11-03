"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUserProjects = exports.viewProjectById = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
var mongoose_1 = require("mongoose");
var Project_1 = __importDefault(require("../models/Project"));
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, name, project, created_project, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, description = _a.description, name = _a.name;
                if (!description || !name) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "name and description are required" })];
                }
                project = new Project_1.default();
                project.name = name;
                project.description = description;
                project.owner = req["currentUser"].id;
                console.log(req["currentUser"]);
                return [4 /*yield*/, project.save()];
            case 1:
                created_project = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Project created successfully", data: created_project })];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json({ message: "error creating project" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
var updateProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, name, id, project, updated_project, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, description = _a.description, name = _a.name;
                if (!description || !name) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "name and description are required" })];
                }
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "id is parameter required" })];
                }
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "invalid project id" })];
                }
                return [4 /*yield*/, Project_1.default.findById(id)];
            case 1:
                project = _b.sent();
                console.log(project);
                if (project == null) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "project not found" })];
                }
                if (project.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to edit this post" })];
                }
                project.name = name;
                project.description = description;
                console.log(req["currentUser"]);
                return [4 /*yield*/, project.save()];
            case 2:
                updated_project = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Project updated successfully", data: updated_project })];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).json({ message: "error editing project", 'err': error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProject = updateProject;
var deleteProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pr, soft_deleted, error_3, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Project_1.default.findById(id)];
            case 2:
                pr = _a.sent();
                if (pr == null) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: 'product not found' })];
                }
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to delete this project" })];
                }
                pr.deleted_at = new Date();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, pr.save()];
            case 4:
                soft_deleted = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: 'product deleted' })];
            case 5:
                error_3 = _a.sent();
                console.log(pr);
                return [2 /*return*/, res.status(400).json({ success: false, message: 'product not found....', err: error_3, data: pr })];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                res.status(400).json({ success: false, message: 'product not found..', err: err_1.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteProject = deleteProject;
var viewProjectById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pr, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Project_1.default.findById(id)];
            case 2:
                pr = _a.sent();
                if (!pr) {
                    res.status(400).json({ success: false, message: 'product not found' });
                }
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to view this Project" })];
                }
                res.status(200).json({ success: true, message: 'project fetched', 'data': pr });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json({ success: false, message: 'error getting project', error: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.viewProjectById = viewProjectById;
var viewUserProjects = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pr, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Project_1.default.find({ owner: id, deleted_at: null })];
            case 2:
                pr = _a.sent();
                if (!pr) {
                    res.status(400).json({ success: false, message: 'projects not found' });
                }
                res.status(200).json({ success: true, message: 'project fetched', 'data': pr });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({ success: false, message: 'error getting project', error: err_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.viewUserProjects = viewUserProjects;
//# sourceMappingURL=ProjectController.js.map