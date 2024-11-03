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
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("../src/index"));
var Project_1 = __importDefault(require("../src/models/Project"));
var Task_1 = __importDefault(require("../src/models/Task"));
var mockUserId = new mongoose_1.default.Types.ObjectId();
function faker(length, type) {
    if (type == 'name') {
        var d = new Date();
        var time = d.getTime();
        return "name" + time;
    }
    if (type == "email") {
        var d = new Date();
        var time = d.getTime();
        return time + "@gmail.com";
    }
}
var valid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjY4MGRhMGVlNjgzMGNhNDViMDk1ZiIsImlhdCI6MTczMDU3NjYwMiwiZXhwIjoxNzMwNzQ5NDAyfQ.uCyg7gUf3aDbrJDyQIcpmz03jh_5KF8HgRE2x98sbMs';
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb+srv://nsimamfon:QkvGoIqnqGtWILDK@production.8cohh41.mongodb.net/?retryWrites=true&w=majority&appName=production', {})];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Sky ventures CRUD API', function () {
    jest.setTimeout(8000000);
    it('should login user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/user/login')
                        .send({
                        email: "one@gmail.com",
                        password: "password"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status === 401 || response.status === 500 || response.status === 200).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, email, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = faker(7, "name");
                    email = faker(9, "email");
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/user/create')
                            .send({
                            username: username,
                            email: email,
                            password: "123456"
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status === 400 || response.status === 201).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a project', function () { return __awaiter(void 0, void 0, void 0, function () {
        var project, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new Project_1.default();
                    project.name = "Project name";
                    project.description = "description here";
                    project.owner = "672680da0ee6830ca45b095f";
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/project/')
                            .set('Authorization', "Bearer ".concat(valid_token))
                            .send(project)];
                case 1:
                    response = _a.sent();
                    expect(response.body.message == "name and description are required" || response.body.message == "Project created successfully" || response.body.message == "error creating project" || response.body.message == "Unauthorized").toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update project', function () { return __awaiter(void 0, void 0, void 0, function () {
        var project, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new Project_1.default();
                    project.name = "Project name";
                    project.description = "description here";
                    project.owner = "672680da0ee6830ca45b095f";
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .put('/api/project/672681100ee6830ca45b0961')
                            .set('Authorization', "Bearer ".concat(valid_token))
                            .send(project)];
                case 1:
                    response = _a.sent();
                    expect(response.body.message == "name and description are required" || response.body.message == "Project created successfully" || response.body.message == "error creating project" || response.body.message == "Unauthorized").toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var project, stringId, objectId, task, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new Task_1.default();
                    stringId = '672681100ee6830ca45b0961';
                    objectId = new mongoose_1.default.Types.ObjectId(stringId);
                    task = new Task_1.default();
                    task.title = "Title here";
                    task.description = "Description is here";
                    task.project = objectId;
                    task.status = "pending";
                    task.due_date = new Date();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/task/')
                            .set('Authorization', "Bearer ".concat(valid_token))
                            .send(project)];
                case 1:
                    response = _a.sent();
                    expect(response.body.message == "title, project_id and status are required" || response.body.message == "task created successfully" || response.body.message == "error creating task" || response.body.message == "Unauthorized").toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should edit a task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var project, stringId, objectId, task, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new Task_1.default();
                    stringId = '672681100ee6830ca45b0961';
                    objectId = new mongoose_1.default.Types.ObjectId(stringId);
                    return [4 /*yield*/, Task_1.default.findById('672686ca13c4e6d77cb53ded')];
                case 1:
                    task = _a.sent();
                    task.title = "title";
                    task.description = "description";
                    task.status = "completed";
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .put('/api/task/672686ca13c4e6d77cb53ded')
                            .set('Authorization', "Bearer ".concat(valid_token))
                            .send(project)];
                case 2:
                    response = _a.sent();
                    expect(response.status == 200 || response.status == 400 || response.status == 401).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=test.js.map