import express from 'express';
import type {Request, Response} from 'express';
import { AdditemService } from '../../services/order/AdditemService.js';

class AdditemController{
    async handle(req: Request, res: Response){
        const { order_id, product_id, amount } = req.body;

        const addItem = new AdditemService();

        const order = await addItem.execute({ order_id, product_id, amount });

        return res.json(order);
    }
}

export { AdditemController };