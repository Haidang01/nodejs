import express from "express";
import apiController from '../controller/apiController'
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
import roleController from '../controller/roleController'
const router = express.Router();

const initApiRouter = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin)
    router.get('/account', userController.getUserAccount);
    router.post('/logout', apiController.handleLogout)

    ///////user routes
    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    // roles routes
    router.get('/role/read', roleController.readFunc);
    router.post('/role/create', roleController.createFunc);
    router.put('/role/update', roleController.updateFunc);
    router.delete('/role/delete', roleController.deleteFunc);

    // group routes
    router.get('/group/read', groupController.readFunc);


    return app.use('/api/v1/', router);


}
export default initApiRouter;