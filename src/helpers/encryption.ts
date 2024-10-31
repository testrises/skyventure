import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserPayload } from "../dto/User.dto";

dotenv.config();
const  JWT_SECRET =  process.env.JWT_SECRET;
export class encryption {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(id) {
    return jwt.sign(id, JWT_SECRET, { expiresIn: "2d" });
  }
}