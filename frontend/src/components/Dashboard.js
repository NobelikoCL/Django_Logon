import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Error al cargar datos');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!userData) {
    return <div className="dashboard-container">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Bienvenido, {userData.first_name}</h2>
        <div className="user-info">
          <p><strong>Usuario:</strong> {userData.username}</p>
          <p><strong>Correo:</strong> {userData.email}</p>
          <p><strong>Nombre completo:</strong> {userData.first_name} {userData.last_name}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
