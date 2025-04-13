import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Modal from 'react-modal';
import { CSVLink } from 'react-csv';
import { useAuth } from '../contexts/AuthContext';
import { useTodos } from '../contexts/TodoContext';
import { useWeather } from '../contexts/WeatherContext';

Modal.setAppElement('#root');

export default function Dashboard() {
  const { logout } = useAuth();
  const { todos, addTodo } = useTodos();
  const { weather, fetchWeather } = useWeather();
  const [btcPrice, setBtcPrice] = useState(null);

  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [weatherModalOpen, setWeatherModalOpen] = useState(false);
  const [city, setCity] = useState('Jaipur');
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    priority: 'medium'
  });

  const handleTodoSubmit = async () => {
    await addTodo(todoData);
    setTodoModalOpen(false);
    setTodoData({
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
      priority: 'medium'
    });
  };

  const handleWeatherFetch = async () => {
    await fetchWeather(city);
  };

  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' },
    { label: 'Due Date', key: 'dueDate' },
    { label: 'Priority', key: 'priority' }
  ];

  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      background: 'none',
      overflow: 'visible',
      padding: 0,
      width: '90%',
      maxWidth: '500px'
    }
  };

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_WEB_SOCKET_SERVER}`);
    socket.on('btcPrice', (price) => {
      setBtcPrice(price);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>Task Dashboard</h1>
            <p>Manage your todos and check the weather</p>
          </div>
          <button onClick={logout} className="btn btn-logout">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="action-buttons">
          <button onClick={() => setTodoModalOpen(true)} className="btn btn-primary">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Todo
          </button>

          <button onClick={() => setWeatherModalOpen(true)} className="btn btn-info">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 18a5 5 0 0 0-10 0"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> <path d="M12 4v4"></path> <path d="M3 12h4"></path> <path d="M20 12h1"></path> <path d="M5.6 5.6l3.4 3.4"></path> <path d="M15 9l3.4-3.4"></path>
            </svg>
            Weather Report
          </button>

          <CSVLink data={todos} headers={headers} filename={'todos.csv'} className="csv-link">
            <button className="btn btn-success">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Tasks
            </button>
          </CSVLink>
        </div>

        {weather && (
          <div className="weather-card">
            <div className="weather-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a5 5 0 0 0-10 0"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line><path d="M12 4v4"></path><path d="M3 12h4"></path><path d="M20 12h1"></path><path d="M5.6 5.6l3.4 3.4"></path><path d="M15 9l3.4-3.4"></path>
              </svg>
            </div>
            <div className="weather-info">
              <h3>{weather.location.name}</h3>
              <div className="weather-details">
                <span className="temperature">{weather.current.temp_c}°C</span>
                <span className="condition">{weather.current.condition.text}</span>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h2>Your Tasks</h2>
          </div>
          
          {todos.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <p>No tasks yet. Add your first task to get started!</p>
              <button onClick={() => setTodoModalOpen(true)} className="btn btn-primary">Add Your First Task</button>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => (
                    <tr key={index}>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>
                        <span className={`badge badge-status badge-${todo.status}`}>
                          {todo.status}
                        </span>
                      </td>
                      <td>{new Date(todo.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge badge-priority badge-${todo.priority}`}>
                          {todo.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {btcPrice && (
          <div className="crypto-price-card">
            <h2>Live Bitcoin Price</h2>
            <div className="price-info">
              <span className="price-label">BTC/USDT:</span>
              <span className="price-value">${parseFloat(btcPrice).toFixed(2)}</span>
            </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={todoModalOpen}
        onRequestClose={() => setTodoModalOpen(false)}
        style={customModalStyles}
        contentLabel="Add New Todo"
      >
        <div className="modal-content">
          <div className="modal-header modal-header-primary">
            <h2>Add New Task</h2>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Task title"
                value={todoData.title}
                onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Task description"
                rows="3"
                value={todoData.description}
                onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={todoData.dueDate}
                  onChange={(e) => setTodoData({ ...todoData, dueDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={todoData.priority}
                  onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setTodoModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleTodoSubmit}
                className="btn btn-primary"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={weatherModalOpen}
        onRequestClose={() => setWeatherModalOpen(false)}
        style={customModalStyles}
        contentLabel="Weather Report"
      >
        <div className="modal-content">
          <div className="modal-header modal-header-info">
            <h2>Weather Report</h2>
          </div>

          <div className="modal-body">
            <div className="form-group search-group">
              <label>City</label>
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  onClick={handleWeatherFetch}
                  className="btn btn-info search-btn"
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </div>
            </div>

            {weather ? (
              <div className="weather-display">
                <h3 className="city-name">{weather.location.name}</h3>
                <p className="country-name">{weather.location.country}</p>

                <div className="temperature-display">
                  <span>{weather.current.temp_c}°C</span>
                </div>

                <p className="weather-condition">{weather.current.condition.text}</p>
                <div className="weather-details-grid">
                  <div className="weather-detail-card">
                    <p className="detail-label">Humidity</p>
                    <p className="detail-value">{weather.current.humidity}%</p>
                  </div>
                  <div className="weather-detail-card">
                    <p className="detail-label">Wind</p>
                    <p className="detail-value">{weather.current.wind_kph} km/h</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-weather">
                <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a5 5 0 0 0-10 0"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line><path d="M12 4v4"></path><path d="M3 12h4"></path><path d="M20 12h1"></path><path d="M5.6 5.6l3.4 3.4"></path><path d="M15 9l3.4-3.4"></path>
                </svg>
                <p>Enter a city name and click the search button to get weather information</p>
              </div>
            )}
            <div className="modal-footer">
              <button
                onClick={() => setWeatherModalOpen(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
