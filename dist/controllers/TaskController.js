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
exports.massUpdatetask = exports.viewUserTasks = exports.viewTaskById = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
var mongoose_1 = require("mongoose");
var Task_1 = __importDefault(require("../models/Task"));
var Project_1 = __importDefault(require("../models/Project"));
var createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, status, description, due_date, project_id, task, created_task, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, status = _a.status, description = _a.description, due_date = _a.due_date, project_id = _a.project_id;
                if (!title || !status || !project_id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "title, project_id and status are required" })];
                }
                task = new Task_1.default();
                task.title = title;
                task.description = description;
                task.project = project_id;
                task.status = status;
                task.due_date = due_date;
                return [4 /*yield*/, task.save()];
            case 1:
                created_task = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "task created successfully", data: created_task })];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: "error creating task", err: error_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var updateTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, status, description, due_date, id, task, pr, created_task, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, title = _a.title, status = _a.status, description = _a.description, due_date = _a.due_date;
                if (!title || !status) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "title, and status are required" })];
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
                            .json({ message: "invalid task id" })];
                }
                return [4 /*yield*/, Task_1.default.findById(id)];
            case 1:
                task = _b.sent();
                console.log(task);
                if (task == null) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "task not found" })];
                }
                return [4 /*yield*/, Project_1.default.findById(task.project)];
            case 2:
                pr = _b.sent();
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to edit this task", owners: pr.owner, loggedIn: req["currentUser"].id, oo: pr.owner })];
                }
                task.title = title;
                task.description = description;
                task.status = status;
                task.due_date = due_date;
                return [4 /*yield*/, task.save()];
            case 3:
                created_task = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "task updated successfully", data: created_task })];
            case 4:
                err_1 = _b.sent();
                res.status(400).json({ success: false, message: 'project not found..', err: err_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateTask = updateTask;
var deleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, pr, task2, soft_deleted, error_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Task_1.default.findById(id).populate({
                        path: 'project',
                        select: '_id'
                    }).lean()];
            case 2:
                task = _a.sent();
                if (task == null) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: 'task not found' })];
                }
                return [4 /*yield*/, Project_1.default.findById(task.project)];
            case 3:
                pr = _a.sent();
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to delete this task" })];
                }
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                return [4 /*yield*/, Task_1.default.findById(id)];
            case 5:
                task2 = _a.sent();
                task2.deleted_at = new Date();
                return [4 /*yield*/, task2.save()];
            case 6:
                soft_deleted = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: 'task deleted' })];
            case 7:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ success: false, message: 'task not found....', err: error_2, data: pr })];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_2 = _a.sent();
                res.status(400).json({ success: false, message: 'product not found..', err: err_2.message });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
var viewTaskById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task1, task, pr, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "invalid task id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Task_1.default.findById(id)];
            case 2:
                task1 = _a.sent();
                if (!task1) {
                    res.status(400).json({ success: false, message: 'product not found' });
                }
                return [4 /*yield*/, Task_1.default.findById(id).populate({
                        path: 'project',
                        select: '_id, name'
                    }).lean()];
            case 3:
                task = _a.sent();
                if (task == null) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: 'task not found' })];
                }
                return [4 /*yield*/, Project_1.default.findById(task.project)];
            case 4:
                pr = _a.sent();
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to view this task" })];
                }
                res.status(200).json({ success: true, message: 'task fetched', 'data': task });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(400).json({ success: false, message: 'error getting task', error: err_3.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.viewTaskById = viewTaskById;
var viewUserTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, project_id, status, due_date, _b, limit, page, pr, filter, skip, tasks, err_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, project_id = _a.project_id, status = _a.status, due_date = _a.due_date;
                _b = req.query, limit = _b.limit, page = _b.page;
                console.log(req.query);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                if (!limit) {
                    limit = 3;
                }
                if (!page) {
                    page = 1;
                }
                return [4 /*yield*/, Project_1.default.findById(project_id)];
            case 2:
                pr = _c.sent();
                if (pr == null) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "project not found" })];
                }
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to view these tasks" })];
                }
                filter = {};
                if (status) {
                    filter.status = status;
                }
                if (due_date) {
                    filter.due_date = { $lte: new Date(due_date) }; // Filter by date
                }
                filter.deleted_at = null;
                skip = (page - 1) * limit;
                return [4 /*yield*/, Task_1.default.find(filter).sort({ created_at: -1 })
                        .limit(limit)
                        .skip(skip)];
            case 3:
                tasks = _c.sent();
                res.status(200).json({ success: true, message: 'task fetched', 'data': tasks, 'page': page, 'limit': limit });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _c.sent();
                res.status(400).json({ success: false, message: 'error getting task', error: err_4.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.viewUserTasks = viewUserTasks;
var massUpdatetask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, project_id, status, pr, result, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, project_id = _a.project_id, status = _a.status;
                console.log(project_id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Project_1.default.findById(project_id)];
            case 2:
                pr = _b.sent();
                if (pr == null) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "project not found" })];
                }
                if (pr.owner != req["currentUser"].id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "you don not have the privilege to view this task" })];
                }
                return [4 /*yield*/, Task_1.default.bulkWrite([
                        {
                            updateMany: {
                                filter: { project: project_id },
                                update: { $set: { status: status } }
                            }
                        }
                    ])];
            case 3:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: 'tasks updated' })];
            case 4:
                err_5 = _b.sent();
                console.log(err_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.massUpdatetask = massUpdatetask;
//# sourceMappingURL=TaskController.js.map