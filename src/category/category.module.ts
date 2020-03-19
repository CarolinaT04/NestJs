import { Module }             from '@nestjs/common';
import { CategoryService }    from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule }     from '@nestjs/mongoose';
import { CategorySchema }     from './schemas/category.schemas';
@Module({
  imports    : [
    MongooseModule.forFeature([
      {name   : 'Category' , 
       schema : CategorySchema }  //Conexion con mongo db mediante schemas 
    ])
   ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
