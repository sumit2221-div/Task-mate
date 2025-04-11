import  task from "./../model/task.model.js";


export const CreateTask = async(req,res)=> {

    const {title,description,dueDate,category} = req.body;

    if(!title || !description || !dueDate || !category){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    try {
        const taskData = await task.create({
            title,
            description,
            dueDate,
            category
        });

        return res.status(201).json({message:"Task created successfully",task:taskData});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
        
    }

}

export const GetAllTask = async(req,res)=> {
    try {

        const {query, category} = req.query;

        const filter = {};

        if(query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                
            ];
        }
        if(category) {
            filter.category = category;
        }

        const tasks = await task.find(filter).sort({createdAt:-1});
        return res.status(200).json({message:"Tasks fetched successfully",tasks});  

        
    } catch (error) {
        
    }
}


export const EditTask = async(req,res)=> {

    try {
        const {id} = req.params;
        const {title,description,dueDate,category} = req.body;
      
        const taskData = await task.findById(id);
        if(!taskData){
            return res.status(404).json({message:"Task not found"});
        }

        if(taskData){
            const updatedTask = await task.findByIdAndUpdate(id,{
                title:title || taskData.title,
                description:description || taskData.description,
                dueDate:dueDate || taskData.dueDate,
                category:category || taskData.category
            },{new:true});

            return res.status(200).json({message:"Task updated successfully",task:updatedTask});
        }
        
    } catch (error) {
        
    }

}

export const DeleteTask = async(req,res)=> {
    try {
        const {id} = req.params;
        const taskData = await task.findById(id);
        if(!taskData){
            return res.status(404).json({message:"Task not found"});
        }

        if(taskData){
            await task.findByIdAndDelete(id);
            return res.status(200).json({message:"Task deleted successfully"});
        }
        
    } catch (error) {
        
    }
}


export const ToggleTaskCompletion = async(req,res)=> {
    try {
        const {id} = req.params;
        const taskData = await task.findById(id);
        if(!taskData){
            return res.status(404).json({message:"Task not found"});
        }

        if(taskData){
            const updatedTask = await task.findByIdAndUpdate(id,{
                completed:!taskData.completed
            },{new:true});

            return res.status(200).json({message:"Task updated successfully",task:updatedTask});
        }
        
    } catch (error) {
        
    }

}

