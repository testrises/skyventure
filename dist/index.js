"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var db_1 = require("./config/db");
var UserRoute_1 = __importDefault(require("./routes/UserRoute"));
var ProjectRoute_1 = __importDefault(require("./routes/ProjectRoute"));
var TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
dotenv.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/user', UserRoute_1.default);
app.use('/api/project', ProjectRoute_1.default);
app.use('/api/task', TaskRoute_1.default);
process
    .on('unhandledRejection', function (reason, p) {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', function (err) {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});
//connect to database
(0, db_1.connectDB)();
// start express server
app.listen(3000);
exports.default = app;
console.log("Express server has started ");
//# sourceMappingURL=index.js.map