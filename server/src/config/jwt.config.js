import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./variables.env" });

export function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}
