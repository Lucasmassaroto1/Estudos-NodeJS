import express from 'express';
import type {Request, Response} from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService.js';

class ListCategoryController{
    async handle(req: Request, res: Response){
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute();

        return res.json(category);
    }
}

export { ListCategoryController }