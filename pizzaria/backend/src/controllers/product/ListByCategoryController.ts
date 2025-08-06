import express from 'express';
import type {Request, Response} from 'express';
import { ListByCategoryServices } from '../../services/product/ListByCategoryService.js';

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;

        const listByCategory = new ListByCategoryServices();

        const products = await listByCategory.execute({category_id});

        return res.json(products)
    }
}

export { ListByCategoryController }