import { ContactDTO } from "src/auth/domain/dtos/ContactDTO";
import { CreateContactUseCase } from "src/auth/domain/ports/in/CreateContactUseCase";
import { ContactRepository } from "src/auth/domain/ports/out/ContactRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class CreateContactUseCaseImpl implements CreateContactUseCase {
    constructor(
        @Inject("ContactRepository") private readonly contactRepository: ContactRepository
    ){}

    public async createContact(contact: ContactDTO): Promise<string> {
        return await this.contactRepository.createContact(contact);
    }

}