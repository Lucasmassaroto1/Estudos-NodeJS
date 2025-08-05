import express, { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController.js';
import { AuthUserController } from './controllers/user/AuthUserController.js';
import { DetailUserController } from './controllers/user/DetailUserController.js';

import { CreateCategoryController } from './controllers/category/CreateCategoryController.js';
import { ListCategoryController } from './controllers/category/ListCategoryController.js';

import { CreateProductController } from './controllers/product/CreateProductController.js';

// ------ IMPORTANDO MIDDLEWARES ------
import { isAuthenticated } from './middlewares/isAuthenticated.js';
import uploadConfig from './config/multer.js';

const router = Router();
const upload = multer({storage: uploadConfig.upload("./tmp").storage});

// ------ ROTAS USER ------
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

// ------ ROTAS CATEGORY ------
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryController().handle);

// ------ ROTAS PRODUCT ------
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

export { router };