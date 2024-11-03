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
exports.login = exports.createUser = void 0;
var User_1 = __importDefault(require("../models/User"));
var encryption_1 = require("../helpers/encryption");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req_user, password, user, user_created, token, newObj, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req_user = req.body;
                if (!req_user.username || !req_user.password || !req_user.email) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: 'All fields are required' })];
                }
                return [4 /*yield*/, encryption_1.encryption.encryptpass(req_user.password)];
            case 1:
                password = _a.sent();
                req_user.password = password;
                user = new User_1.default(req_user);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, user.save()];
            case 3:
                user_created = _a.sent();
                return [4 /*yield*/, encryption_1.encryption.generateToken({ id: user_created._id })];
            case 4:
                token = _a.sent();
                console.log(user_created._id);
                newObj = user_created.toObject();
                delete newObj.password;
                res.status(201).json({ success: true, message: "new user created", data: newObj, token: token });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1.message);
                res.status(400).json({ success: false, message: error_1.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, token, user_new, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: " email and password required" })];
                }
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _b.sent();
                isPasswordValid = encryption_1.encryption.comparepassword(user.password, password);
                if (!user || !isPasswordValid) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                token = encryption_1.encryption.generateToken({ id: user.id });
                user_new = user.toObject();
                delete user_new.password;
                return [2 /*return*/, res.status(200).json({ message: "Login successful", data: user_new, token: token })];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(401).json({ message: "user not found" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
/*export const deleteProduct = async (req,res) =>{
    const {id} = req.params;
    console.log(id);
    try{
     const pr = await Product.findById(id);
     if(!pr){
        res.status(400).json({success:false, message:'product not found'})
     }
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true, message:'product deleted'})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'product not found'})
    }
  
}

export const updateProduct = async (req,res) =>{

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({success:false, data:'not found', message:'invalid id'});
        return;
    }

  
    const prod = req.body;
    try{
    const updatedprod = await Product.findByIdAndUpdate(id, prod, {new:true})
    res.status(200).json({success:true, data:updatedprod})
    }
    catch(err)
    {
        res.status(400).json({success:false, data:'not found', message:err.message})
    }
   
   
}

export const fetchProductById = async (req,res) =>{

    const {id} = req.params;
    const prod = await Product.findById(id);
   
    res.status(200).json({success:true, data:prod})
}*/ 
//# sourceMappingURL=UserController.js.map