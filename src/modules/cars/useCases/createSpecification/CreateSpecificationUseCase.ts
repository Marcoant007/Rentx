import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../testing/ISpecificationsRepository";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ description, name }: IRequest):Promise<void>  {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification already Exists!", 400);
        }

        await this.specificationsRepository.create({
            name,
            description,
        })
    }

}

export default CreateSpecificationUseCase;