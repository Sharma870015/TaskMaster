import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ReminderModal from './ReminderModal';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const location = useLocation();
  const email = location.state?.email || '';
  const username = email.split('@')[0];

  useEffect(() => {
    fetchRandomTodos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [todos]);

  const fetchRandomTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching random todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTitle.trim() && newDescription.trim()) {
      const currentDate = new Date().toLocaleString();
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTitle,
        description: newDescription,
        createdAt: currentDate,
        completed: false,
      };
      setTodos([newTodoItem, ...todos]);
      setNewTitle('');
      setNewDescription('');
      setSelectedTodo(newTodoItem);
      setIsReminderModalOpen(true);
    } else {
      try {
        const randomLimit = Math.floor(Math.random() * 10) + 1; // Random limit between 1 and 10
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${randomLimit}`);
        const randomTodo = response.data[Math.floor(Math.random() * response.data.length)];
        const currentDate = new Date().toLocaleString();
        const newTodoItem = {
          ...randomTodo,
          createdAt: currentDate,
        };
        setTodos([newTodoItem, ...todos]);
      } catch (error) {
        console.error('Error fetching random todo:', error);
      }
    }
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditingTitle(todo.title);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, { ...editingTodo, title: editingTitle });
      const updatedTodos = todos.map((todo) => (todo.id === editingTodo.id ? response.data : todo));
      setTodos(sortTodosByDate(updatedTodos));
      setEditingTodo(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleSaveReminder = (date, time) => {
    const updatedTodo = { ...selectedTodo, reminderDate: date, reminderTime: time };
    setTodos(todos.map((todo) => (todo.id === selectedTodo.id ? updatedTodo : todo)));
    setIsReminderModalOpen(false);
  };

  const checkReminders = () => {
    const currentTime = new Date();
    todos.forEach((todo) => {
      if (todo.reminderDate && todo.reminderTime) {
        const reminderDateTime = new Date(`${todo.reminderDate}T${todo.reminderTime}:00`);
        if (currentTime >= reminderDateTime) {
          alert(`Reminder: ${todo.title}`);
          const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
              return { ...t, reminderDate: null, reminderTime: null };
            }
            return t;
          });
          setTodos(sortTodosByDate(updatedTodos));
        }
      }
    });
  };

  const sortTodosByDate = (todos) => {
    return todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <div className="todo-list-container">
        <div className="greeting-content">
                  <h2 className="greeting">Welcome, {username}!</h2>
  </div>
      
      <div className="todo-list-box">
        <div className="todo-header">
          <input
            className="todo-input"
            type="text"
            value={newTitle}
            onChange={(e) => handleInputChange(e, setNewTitle)}
            placeholder="Enter task title"
          />
          <input
            className="todo-input"
            type="text"
            value={newDescription}
            onChange={(e) => handleInputChange(e, setNewDescription)}
            placeholder="Enter task description"
          />
          <button className="todo-button" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        <ul className="todo-list">
          {sortTodosByDate(todos).map((todo) => (
            <li className="todo-item" key={todo.id}>
              {editingTodo && editingTodo.id === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={handleUpdateTodo}>Update</button>
                </>
              ) : (
                <>
                  <div>
                    <span>{todo.title}</span>
                    <span className="description">{todo.description}</span>
                  </div>
                  <div className="date-time">Added on: {todo.createdAt}</div>
                  {todo.reminderDate && todo.reminderTime && (
                    <span className="reminder">
                      Reminder: {todo.reminderDate} at {todo.reminderTime}
                    </span>
                  )}
                  <div className="todo-actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditTodo(todo)}
                      className="icon"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="icon"
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSave={handleSaveReminder}
      />
    </div>
  );
};

export default TodoList;
