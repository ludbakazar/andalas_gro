import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as jose from "jose";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyTokenJose = async (token) => {
  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload;
};
