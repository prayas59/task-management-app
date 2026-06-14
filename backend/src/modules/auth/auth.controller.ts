import { Request, Response, NextFunction } from "express";

import { AuthService } from "./auth.service";

import { AuthRequest } from "../../common/types/auth-request";

export class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const result = await this.authService.signup(name, email, password);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(201).json({
        success: true,
        data: result.user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json({
        success: true,
        data: result.user,
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.getMe(req.user!.userId);

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie("token");

    return res.json({
      success: true,
      message: "Logged out",
    });
  };
}
