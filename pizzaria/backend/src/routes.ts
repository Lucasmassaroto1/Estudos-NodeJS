import express, { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    return res.json({ nome: "Pizzaria do apela" })
});

export { router };