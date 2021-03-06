import ICreateCarDTO from "../../dtos/ICreateCarDTO";
import Car from "../../infra/typeorm/entities/Car";
import Category from "../../infra/typeorm/entities/Category";
import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    
    cars: Car[] = [];
    async create({ name, description, daily_rate, brand, category_id, fine_amount, license_plate }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, { name, description, daily_rate, brand, category_id, fine_amount, license_plate });
        this.cars.push(car);

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carAvailable = this.cars.filter((car) => {
            if (car.available === true ||
                ((brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name))) {
                return car
            }
            return null;
        });

        return carAvailable;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id ); 
    }
    

}

export default CarsRepositoryInMemory