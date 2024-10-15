import { API_VERSION } from "src/config";
import { JWT_KEY } from "src/config";

import { UserService } from "src/users/application/services/UserService";
import { UserMapper } from "src/users/application/mappers/UserMappers";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { Controller, Post, Res, Body, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

@Controller(`api/${API_VERSION}/users`)
export class LoginController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/login")
    public async login(@Body('email') email: string, @Body('password') password: string,  @Res() res: Response) {
        try {
            const user = await this.userService.login(email)
            
            if(!user) {
                throw new Error("User don't found");
            }
            const passwordMatch = await compare(password, user.password);
            if(!passwordMatch) {
                res.status(401).send("invalid password");
            }

            const token = sign({user}, JWT_KEY as string, {expiresIn: '12h'})

            const userById = await this.userService.getById(user.uuid);
            const userResponse = UserMapper.toUserResponse(userById);
            const response = new BaseResponse({ user: userResponse, token: token }, true, "User logged in successfully");
            res.status(HttpStatus.ACCEPTED).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(null, false, "User not logged in", error);
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}