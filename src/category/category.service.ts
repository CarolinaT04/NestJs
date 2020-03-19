import { Injectable }         from '@nestjs/common';
import { Model }              from 'mongoose';
import { InjectModel }        from '@nestjs/mongoose';
import { Category }           from './interfaces/category.interfaces';
import { CreateCategoryDTO }  from './dto/category.dto';


@Injectable()
export class CategoryService {

    constructor(@InjectModel('Category') private readonly categoryModel : Model<Category>) {}

        async createCategory(createCategoryDTO : CreateCategoryDTO) : Promise<Category> {
          const category = new this.categoryModel(createCategoryDTO);
          return await category.save();

    }

    async getCategories(): Promise<Category[]>{

        const categories = await this.categoryModel.find();
        return categories;
    }

    async getCategory( categoryId: string): Promise<Category>{
        const category = await this.categoryModel.findById(categoryId);
        return category;

    }

    async updateCategory( categoryId : string , createCategoryDTO : CreateCategoryDTO): Promise<Category>{

        const category = await this.categoryModel.findByIdAndUpdate( categoryId , createCategoryDTO , {new  : true});
        return category;
    }

    async deleteCategory( categoryId : string ): Promise<Category>{

        const category = await this.categoryModel.findByIdAndDelete(categoryId);
        return category;
    }
}
