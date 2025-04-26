import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import { getUser } from '../../Services/loginService';

const Profile = () => {

  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProfiledata();
  }, [])

  const getProfiledata = async () => {
    getUser()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        
      });
  }

  const handleCloseSesion = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh', width: '100%' }}>
      <Col span={12}>
        <div className="profile-card">
          <img
            src={data.image}
            alt="WebdeCero Logo"
            className="company-logo"
          />
          <div className="profile-content">
            <div className="profile-name">{data.username} {data.lastName}</div>
            <div className="profile-email">{data.email}</div>
            <div className="profile-location">
              <EnvironmentOutlined />
              <span>{data.address?.city} - {data.address?.country}</span>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{data.birthDate}</span>
                <span className="stat-label">Cumpleaños</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data.age}</span>
                <span className="stat-label">Edad</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data.phone}</span>
                <span className="stat-label">Teléfono</span>
              </div>
            </div>
            <div className="profile-info">
              <p className="info-item">Información personal 1: xx</p>
              <p className="info-item">Información personal 1: xx</p>
              <p className="info-item">Información personal 1: xx</p>
            </div>
            <div className="profile-info">
              <Button color="primary" variant="solid" onClick={handleCloseSesion}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Profile;
