import { Controller,
    Get,
    Post,
    Put, 
    Delete,
    Res, 
    HttpStatus,
    Body,
    Param,
    NotFoundException,
    Query, 
    UseGuards}                   from '@nestjs/common';
import { CreateServiceDTO }      from './dto/services.dto';
import { ServicesService }       from './services.service';
import { JwtAuthGuard }          from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('services')
export class ServicesController {

    constructor(private servicesService: ServicesService){}
    
    //The createPost ejecute when the request Post is called
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createPost(@Res() res , @Body() createServicesDTO : CreateServiceDTO){
        const service = await this.servicesService.createService(createServicesDTO);

        return res.status(HttpStatus.OK).json({ //If everything is OK , it sends a successfully message and return the data by JSON 

            message: 'Service successfully created',
            service
        });
    }

    //This getServices is ejecute when the request Get is called
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getServices(@Res() res){

        const services = await this.servicesService.getServices();

        return res.status(HttpStatus.OK).json({   //If everything is OK , it sends a successfully message and return the data by json

            message: 'All Services found successfully',
            services
        });
    }

     //This getService is ejectute when the request Get is called
     @UseGuards(AuthGuard('jwt'))
    @Get('/:serviceId')
    async getService(@Res() res , @Param('serviceId')serviceId){

        const service = await this.servicesService.getService(serviceId);
        
        if(!service) throw new NotFoundException('Service does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({   //If everything is OK , it sends a successfully message and return the data by json

            message: 'Service found successfully',
            service
        });
    }

    //This deleteService is ejectute when the request Delete is called
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async delteService(@Res() res, @Query('serviceId') serviceId){

        const service = await this.servicesService.deleteService(serviceId);

        if(!service) throw new NotFoundException('Service does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({  //If everything is OK , it sends a successfully message and return the data by json

            message: 'Service deleted successfully',
            service
        });
    }

    //This updateService is ejecute when the request Put is called.
    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updatedService(@Res() res, @Body() createServiceDTO :CreateServiceDTO, @Query('serviceId') serviceId){

        const service = await this.servicesService.updateService(serviceId , createServiceDTO);
        if(!service) throw new NotFoundException('Service does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({  //If everything is OK , it sends a successfully message and return the data by  json

            message: 'Service updated successfully',
            service
        });
    }
}
