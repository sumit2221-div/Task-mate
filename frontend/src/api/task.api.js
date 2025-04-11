import axios from "./api.js";

export const getTasks = async(params = {})=> {
    try {
        const response = await axios.get('/task', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export const createTask = async(taskData)=> {
    try {
        const response = await axios.post('/task', taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}
export const updateTask = async (id, task) => {
    try {
      const res = await axios.put(`/task/${id}`, task);
      return res.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  export const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/task/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

