import express, { Router } from 'express';
import multer from 'multer';

// ------ IMPORTANDO CONTROLLER ------
import { CreateUserController } from './controllers/user/CreateUserController.js';
import { AuthUserController } from './controllers/user/AuthUserController.js';
import { DetailUserController } from './controllers/user/DetailUserController.js';

import { CreateCategoryController } from './controllers/category/CreateCategoryController.js';
import { ListCategoryController } from './controllers/category/ListCategoryController.js';

import { CreateProductController } from './controllers/product/CreateProductController.js';
import { ListByCategoryController } from './controllers/product/ListByCategoryController.js';

import { CreateOrderController } from './controllers/order/CreateOrderController.js';
import { RemoveOrderController } from './controllers/order/RemoveOrderController.js';
import { AdditemController } from './controllers/order/AdditemController.js';
import { RemoveItemController } from './controllers/order/RemoveItemController.js';
import { SendOrderController } from './controllers/order/SendOrderController.js';
import { ListOrdersController } from './controllers/order/ListOrdersController.js';
import { DetailOrderController } from './controllers/order/DetailOrderController.js';
import { FinishOrderController } from './controllers/order/FinishOrderController.js';

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

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

// ------ ROTAS ORDER ------
router.post('/order', isAuthenticated, new CreateOrderController().handle);

router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AdditemController().handle);

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);

router.put('/order/send', isAuthenticated, new SendOrderController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle);

router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/orders/finish', isAuthenticated, new FinishOrderController().handle);

export { router };