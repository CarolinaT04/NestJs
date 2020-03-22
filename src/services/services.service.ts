import { Injectable }        from '@nestjs/common';
import { Model }             from 'mongoose';
import { InjectModel }       from '@nestjs/mongoose';
import { Service }           from './interfaces/services.interfaces';
import { CreateServiceDTO }  from './dto/services.dto';

@Injectable()
export class ServicesService {

    constructor(@InjectModel('Service') private readonly serviceModel: Model<Service>){}

    //This method create the services
    async createService ( createServiceDTO : CreateServiceDTO): Promise<Service>{
        const service = new this.serviceModel(createServiceDTO);
        return await service.save();

    }

    //This method list all the services
    async getServices(): Promise<Service[]>{
        const  service = await this.serviceModel.find();
        return service;
    }

    //This method find one service by the ID
    async getService(serviceId : string): Promise<Service>{
        const  service = await this.serviceModel.findById(serviceId);
        return service;
    }

    //This method update the service by The ID 
    async updateService(serviceId : string , createServiceDTO: CreateServiceDTO): Promise<Service>{
        const  service = await this.serviceModel.findByIdAndUpdate(serviceId, createServiceDTO, {new : true});
        return service;
    }

    //This method delete the service by the ID
    async deleteService(serviceId : string): Promise<Service>{
        const  service = await this.serviceModel.findByIdAndDelete(serviceId);
        return service;
    }
}
