import { Request, Response, NextFunction } from "express";

import { ApiError } from "../common/responses/api-error";

import { verifyToken } from "../utils/jwt";

import { AuthRequest } from "../common/types/auth-request";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  console.log("AUTH HIT");
  console.log(req.cookies);
  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
};
