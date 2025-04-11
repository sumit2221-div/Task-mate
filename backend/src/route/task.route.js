import express from 'express';
import { 
    CreateTask, 
    GetAllTask, 
    DeleteTask, 
    EditTask, 
    ToggleTaskCompletion 
} from '../controller/task.controller.js';

const router = express.Router();


router.post('/task', CreateTask);

router.get('/task', GetAllTask);

router.put('/task/:id', EditTask);

router.delete('/task/:id', DeleteTask);

router.patch('/task/:id/toggle', ToggleTaskCompletion);

export default router;
