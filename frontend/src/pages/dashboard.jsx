import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask, toggleTask } from '../api/task.api.js';
import { useNavigate } from 'react-router-dom';
import UpdateTaskForm from './UpdateTaskForm.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {};
        if (searchQuery) params.query = searchQuery;
        if (category) params.category = category;

        const data = await getTasks(params);
        setTasks(data.tasks);
        setFilteredTasks(data.tasks);
        console.log('Fetched tasks:', data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks. Please try again.');
      }
    };

    fetchTasks();
  }, [searchQuery, category]);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      setFilteredTasks(filteredTasks.filter((t) => t._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await updateTask(currentTask._id, currentTask);
      setTasks(tasks.map((t) => (t._id === currentTask._id ? updatedTask : t)));
      setFilteredTasks(filteredTasks.map((t) => (t._id === currentTask._id ? updatedTask : t)));
      setIsEditing(false);
      setCurrentTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentTask(null);
    toast.info('Task update canceled.');
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const updatedTask = await toggleTask(id, !currentStatus);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setFilteredTasks(filteredTasks.map((task) => (task._id === id ? updatedTask : task)));
      toast.success('Task status updated successfully!');
    } catch (error) {
      console.error('Error toggling task status:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Task-Mate</h1>
          <button
            onClick={() => navigate('/create-task')}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Create Task
          </button>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Fitness">Fitness</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <h3>{task.category}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        task.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                    >
                       Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                    >
                       Delete
                    </button>
                    <button
                      onClick={() => handleToggle(task._id, task.completed)}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        task.completed ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                      } hover:bg-blue-600`}
                    >
                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10 text-lg">No tasks found. Try adding one!</p>
          )}
        </div>
      </div>
      {isEditing && currentTask && (
        <UpdateTaskForm
          currentTask={currentTask}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;