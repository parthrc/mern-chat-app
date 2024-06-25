import { Request, Response } from "express";

const loginUser = (req: Request, res: Response) => {
  console.log("User login");
  return res.sendStatus(200);
};

const registerUser = (req: Request, res: Response) => {
  console.log("User register");
  return res.sendStatus(200);
};

const logoutUser = (req: Request, res: Response) => {
  console.log("User logout");
  return res.sendStatus(200);
};

export { loginUser, logoutUser, registerUser };
