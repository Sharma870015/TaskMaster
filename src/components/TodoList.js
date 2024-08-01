import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ReminderModal from './ReminderModal';
import ReminderAlert from './ReminderAlert';
import { TodosContext } from './TodosContext';
import './TodoList.css';

const TodoList = () => {
  const { todos, setTodos, isFetched } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const location = useLocation();
  const email = location.state?.email || '';
  const username = email.split('@')[0];

  // Create a ref for the title input
  const titleInputRef = useRef(null);

  useEffect(() => {
    // Focus the title input when the component mounts
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [todos]);

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
    console.log('Delete icon clicked for todo with id:', id); // Debugging log
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo) => {
    console.log('Edit icon clicked for todo:', todo); // Debugging log
    setEditingTodo(todo);
    setEditingTitle(todo.title);
    setEditingDescription(todo.description);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, { ...editingTodo, title: editingTitle, description: editingDescription });
      const updatedTodos = todos.map((todo) => (todo.id === editingTodo.id ? response.data : todo));
      setTodos(sortTodosByDate(updatedTodos));
      setEditingTodo(null);
      setEditingTitle('');
      setEditingDescription('');
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
          setAlertTitle(todo.title);
          setAlertDescription(todo.description);
          setIsAlertOpen(true);
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

  if (!isFetched) {
    return null; // or return a placeholder if necessary
  }

  return (
    <div className="todo-list-container">
      <div className="greeting-content">
        <div className="avatar">{username[0].toUpperCase()}</div>
        <div>
          <h2 className="greeting">Welcome, {username}!</h2>
          <p className="welcome-message">Have a productive day!</p>
        </div>
      </div>

      <div className="todo-list-box">
        <div className="todo-header">
          <input
            className="todo-input"
            type="text"
            value={newTitle}
            onChange={(e) => handleInputChange(e, setNewTitle)}
            placeholder="Enter task title"
            ref={titleInputRef} // Attach the ref here
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
                    className="for-updatelist"
                    placeholder="Edit Title"
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <input
                    className="for-updatedescr"
                    placeholder="Edit Description"
                    type="text"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                  />
                  <button className="Update-btn" onClick={handleUpdateTodo}>Update</button>
                </>
              ) : (
                <>
<div className="todo-info">
  {/* <div className="todo-item-date"> */}
    {todo.reminderDate && todo.reminderTime && (
      <>
        <span className="todo-day">
          {new Date(todo.reminderDate).toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
        <span className="todo-date">
          {new Date(todo.reminderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
        </span>
      </>
    )}
  {/* </div> */}
  <div className="todo-text">
    <span className="todo-title">{todo.title}</span>
    <span className="todo-description">{todo.description}</span>
  </div>
</div>

                  <div className="date-time">Added on: {todo.createdAt}</div>
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
      {isAlertOpen && (
        <ReminderAlert
          title={alertTitle}
          description={alertDescription}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default TodoList;
