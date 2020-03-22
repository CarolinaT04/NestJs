import { Injectable }         from '@nestjs/common';
import { Model }              from 'mongoose';
import { InjectModel }        from '@nestjs/mongoose'; //This import helps to create the model based on  the CategorySchema
import { Category }           from './interfaces/category.interfaces';
import { CreateCategoryDTO }  from './dto/category.dto';


@Injectable()
export class CategoryService {

     //Create the constructor of the AccountService class and pass the injectModel parameter for the model.
    constructor(@InjectModel('Category') private readonly categoryModel : Model<Category>) {}

    //This method create the Category.
    //The async and await are used because mongoose does asynchronous queries
        async createCategory(createCategoryDTO : CreateCategoryDTO) : Promise<Category> {
          const category = new this.categoryModel(createCategoryDTO);
          return await category.save();

    }

    //This method find all the Categories
    async getCategories(): Promise<Category[]>{

        const  categories = await this.categoryModel.find();
        return categories;
    }

    //This method find one category by the ID
    async getCategory( categoryId: string): Promise<Category>{
        const  category = await this.categoryModel.findById(categoryId);
        return category;

    }

    //This method update a specific category by the ID
    //The {new: true} get the new updated data
    async updateCategory( categoryId : string , createCategoryDTO : CreateCategoryDTO): Promise<Category>{

        const  category = await this.categoryModel.findByIdAndUpdate( categoryId , createCategoryDTO , {new  : true});
        return category;
    }

    //This method delete the category by the ID
    async deleteCategory( categoryId : string ): Promise<Category>{

        const  category = await this.categoryModel.findByIdAndDelete(categoryId);
        return category;
    }
}
