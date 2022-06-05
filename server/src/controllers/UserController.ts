import User from "@models/UserEntity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/Logger";

interface JWTPayload {
  uuid: string;
  iat: Date;
  exp: Date;
}

class UserController {
  findOne = async (req: Request, res: Response) => {
    const { token } = req.query;
    if (token) {
      const { uuid } = jwt.decode(token as string) as unknown as JWTPayload;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { uuid } });

      if (user) {
        res.status(200).send({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleId,
          },
        });
      }
    } else {
      res.status(400).send({ data: { message: "Token not provided!" } });
    }
  };

  register = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const userData = new User(req.body);

    const errors = await validate(userData);

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((error) => error.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    if (userData.password) {
      userData.password = bcrypt.hashSync(userData.password, 10);
    }

    try {
      const newUser = await userRepository.save(userData);
      return res.status(200).json({
        data: {
          ...newUser,
        },
      });
    } catch (error: any) {
      Logger.error(error.message as string);
      return res.status(400).json({
        data: {
          message:
            error.routine === "_bt_check_unique"
              ? "Email já está sendo utilizado!"
              : "Houve algum erro, tente novamente!",
        },
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req.params.id, {
      relations: ["courseId", "roleId"],
    });

    const newUserData = req.body;

    if (user && !(await bcrypt.compare(newUserData.password, user.password))) {
      return res.status(400).json({
        data: {
          message: "Senha atual não confere!",
        },
      });
    }

    if (newUserData.newPassword) {
      newUserData.password = bcrypt.hashSync(newUserData.newPassword, 10);
      delete newUserData.newPasswordRepeat;
      delete newUserData.newPassword;
    }

    if (newUserData.email) {
      delete newUserData.password;
    }

    const newUser = new User({
      ...user,
      ...newUserData,
    });

    const errors = await validate(newUser);

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((e) => e.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    try {
      const userUpdated = await userRepository.save(newUser);
      return res.status(200).json({
        data: {
          ...userUpdated,
        },
      });
    } catch (error: any) {
      Logger.error(error.message as string);
      return res.status(400).json({
        data: {
          message:
            error.routine === "_bt_check_unique"
              ? "Email já está sendo utilizado!"
              : "Houve algum erro, tente novamente!",
        },
      });
    }
  };
}

export default UserController;
