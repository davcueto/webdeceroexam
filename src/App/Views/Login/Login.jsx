// Insert your imports there
import { Row, Col, Card, Alert, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';
import { useState } from 'react';
import { login } from '../../Services/loginService';

const Login = () => {

  //* Esquema de validación con Yup *//
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Requerido'),
    password: Yup.string().required('Requerido'),
  });
  //

  const navigate = useNavigate();
  const [msgInvalidCredential, setMsgInvalidCredential] = useState(false);
  const [showSpin, setShowSpin] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setShowSpin(true);
    login(values)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/profile', { replace: true });
        setShowSpin(false);
      })
      .catch((error) => {
        console.error(error);
        setShowSpin(false);
        setMsgInvalidCredential(true);
        setTimeout(() => {
          setMsgInvalidCredential(false);
        }, 3000);
      });
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Row justify="center" align="middle" style={{ height: '100vh', width: '100%' }}>
          <Col span={6}>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
                {touched.username && errors.username && (
                  <div className="error" style={{ color: 'white' }}>{errors.username}</div>
                )}
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <div className="error" style={{ color: 'white' }}>{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="login-button">
                  AUTENTICAR
                </button>
                {showSpin && <Spin size="large" className='spin' />}
                {msgInvalidCredential && <Alert message="Credenciales inválidas" type="error" showIcon className='alert-error-sesion' />}
              </div>
            </form>
          </Col>
        </Row>
      )}
    </Formik>
  );
}

export default Login;