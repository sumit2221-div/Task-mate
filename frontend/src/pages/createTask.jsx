import React, { useState } from 'react';
import { createTask } from '../api/task.api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      toast.success('🎉 Task created successfully!');
      setFormData({ title: '', description: '', dueDate: '', category: '' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error('❌ Failed to create task. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📝 Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          {['title', 'description', 'dueDate', 'category'].map((field, i) => (
            <div key={i} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field === 'dueDate' ? 'Due Date' : field}
              </label>
              {field === 'description' ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter task description"
                />
              ) : field === 'category' ? (
                <select
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type={field === 'dueDate' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder={`Enter ${field}`}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
             Create Task
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateTask;
