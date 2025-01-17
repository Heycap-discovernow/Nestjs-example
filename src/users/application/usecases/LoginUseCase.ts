import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async login(email: string): Promise<UserDTO> {
        return await this.userRepository.getByEmail(email);
    }
}