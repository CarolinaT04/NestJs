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
        UseGuards}              from '@nestjs/common';
import { CreateCategoryDTO }    from './dto/category.dto';
import { CategoryService }      from './category.service';
import { JwtAuthGuard }         from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {

     //Adding the CategoryService as a class method
    constructor(private categoryService: CategoryService){}

    //The createPost is ejecute when the request Post is called 
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createPost(@Res() res , @Body() createCategoryDTO : CreateCategoryDTO){
        
        const category = await this.categoryService.createCategory(createCategoryDTO);

        return res.status(HttpStatus.OK).json({    //If everything is OK , it sends a successfully message and return the data by a JSON

            message: 'Category Successfully created',
            category
        });

    }

    //This getCategories is ejectute when the request Get is called
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getCategories(@Res() res ){

        const categories = await this.categoryService.getCategories();

        return res.status(HttpStatus.OK).json({  //If everything is OK , it sends a successfully message and return the data by a JSON

            message: 'All categories',
            categories
        })
    }

    //This getCategory is ejecute when the request Get is called and it needs an ID to list the data
    @UseGuards(AuthGuard('jwt'))
    @Get('/:categoryId')
    async getCategory(@Res() res , @Param('categoryId') categoryId){
        const category = await this.categoryService.getCategory(categoryId);

        if (!category) throw new NotFoundException('Category does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                               //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Category found successfully',
            category
        })
    }

    //This deleteCategory is ejecute when the request Delete is called and 
    //It needs an ID to find and delete the category
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deleteCategory(@Res() res , @Query('categoryId') categoryId){
        const category = await this.categoryService.deleteCategory(categoryId);
        if(!category) throw new NotFoundException('Category does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                              //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Category deleted successfully',
            category
        });
    }

    //This updateCategory is ejecute when the request Put is called and 
    //It needs an ID to find and update the category
    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateCategory(@Res() res , @Body() createCategoryDTO: CreateCategoryDTO , @Query('categoryId') categoryId){
        const category = await this.categoryService.updateCategory( categoryId , createCategoryDTO);
        if(!category) throw new NotFoundException('Category does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                              //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Category Updated Successfully',
            category
        })
    }
}
