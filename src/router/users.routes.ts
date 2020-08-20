import {Router} from 'express';
import { getUsers,createUser,getUserById,deleteUser,updateUser} from '../controllers/users.controller';

const router = Router();


router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);
    


export default router;