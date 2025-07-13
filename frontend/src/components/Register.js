import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    // Agregar un pequeño delay para evitar animaciones rápidas
    if (password.length === 0) {
      setPasswordStrength({
        score: 0,
        message: '',
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false
        }
      });
      return;
    }

    // Agregar una pequeña pausa antes de actualizar
    setTimeout(() => {
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
      };

      const score = Object.values(requirements).filter(Boolean).length;
      let message = '';

      switch (score) {
        case 0:
          message = 'Débil';
          break;
        case 1:
          message = 'Débil';
          break;
        case 2:
          message = 'Medio';
          break;
        case 3:
          message = 'Fuerte';
          break;
        case 4:
          message = 'Muy fuerte';
          break;
        case 5:
          message = 'Excelente';
          break;
        default:
          message = '';
      }

      // Agregar una pequeña transición
      setPasswordStrength(prev => ({
        ...prev,
        score,
        message,
        requirements,
        // Agregar una clase de animación para cada estado
        animationClass: score >= 3 ? 'animated' : ''
      }));
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (passwordStrength.score < 3) {
      alert('La contraseña debe ser al menos fuerte');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso!');
        window.location.href = '/login';
      } else {
        const error = await response.json();
        alert(error.detail || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el registro');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Registro</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="first_name">Nombre</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Tu apellido"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="tu@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="••••••••"
            />
            <div className="password-strength">
              <div className="strength-indicator">
                <div className="strength-bar">
                  <div className="strength-progress" style={{ width: `${(passwordStrength.score / 5) * 100}%` }}></div>
                </div>
                <div className="strength-labels">
                  <span className="label">Débil</span>
                  <span className="label">Medio</span>
                  <span className="label">Fuerte</span>
                  <span className="label">Muy Fuerte</span>
                  <span className="label">Excelente</span>
                </div>
              </div>
              <div className="requirements-list">
                <div className={`requirement ${passwordStrength.requirements.length ? 'met' : ''}`}>
                  <span>•</span> Mínimo 8 caracteres
                </div>
                <div className={`requirement ${passwordStrength.requirements.uppercase ? 'met' : ''}`}>
                  <span>•</span> Letra mayúscula
                </div>
                <div className={`requirement ${passwordStrength.requirements.lowercase ? 'met' : ''}`}>
                  <span>•</span> Letra minúscula
                </div>
                <div className={`requirement ${passwordStrength.requirements.number ? 'met' : ''}`}>
                  <span>•</span> Número
                </div>
                <div className={`requirement ${passwordStrength.requirements.special ? 'met' : ''}`}>
                  <span>•</span> Carácter especial
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-button">
            Registrarse
          </button>
          <div className="auth-footer">
            <p>¿Ya tienes cuenta?{' '}
              <a href="/login" className="auth-link">Inicia Sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
