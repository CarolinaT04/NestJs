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
        Query }              from '@nestjs/common';
import { CreateCategoryDTO } from './dto/category.dto';
import { CategoryService }   from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Post('create')
    async createPost(@Res() res , @Body() createCategoryDTO : CreateCategoryDTO){
        const category = await this.categoryService.createCategory(createCategoryDTO);

        return res.status(HttpStatus.OK).json({

            message: 'Category Successfully created',
            category
        });

    }

    @Get('/')
    async getCategories(@Res() res ){
        const categories = await this.categoryService.getCategories();

        return res.status(HttpStatus.OK).json({

            message: 'All categories',
            categories
        })
    }

    @Get('/:categoryId')
    async getCategory(@Res() res , @Param('categoryId') categoryId){
        const category = await this.categoryService.getCategory(categoryId);

        if (!category) throw new NotFoundException('Category does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Category found successfully',
            category
        })
    }

    @Delete('/delete')
    async deleteCategory(@Res() res , @Query('categoryId') categoryId){
        const category = await this.categoryService.deleteCategory(categoryId);
        if(!category) throw new NotFoundException('Category does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Category deleted successfully',
            category
        });
    }

    @Put('/update')
    async updateCategory(@Res() res , @Body() createCategoryDTO: CreateCategoryDTO , @Query('categoryId') categoryId){
        const category = await this.categoryService.updateCategory( categoryId , createCategoryDTO);
        if(!category) throw new NotFoundException('Category updated successfully');
        return res.status(HttpStatus.OK).json({
            message: 'Category Updated Successfully',
            category
        })
    }
}
