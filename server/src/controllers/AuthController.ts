import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/UserEntity";
import { getRepository } from "typeorm";

class AuthController {
  authenticate = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { email, password } = req.body;

    const user = await userRepository.findOne({
      where: { email },
    });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { uuid: user.uuid },
          process.env.JWT_TOKEN as string,
          {
            expiresIn: "7h",
          }
        );

        return res.status(200).json({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleId,
            token,
          },
        });
      }

      return res.status(401).json({
        data: { message: "Wrong Email or Password!" },
      });
    }

    return res.status(401).json({
      data: { message: "Wrong Email or Password!" },
    });
  };
}

export default AuthController;
