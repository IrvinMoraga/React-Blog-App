import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import './login.css';

export default function Login() {
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, isMobile, setToDesktopMode } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      setIsDisabled(true);
      window.alert('User successfully logged in.');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError(true);
    }
  };

  useEffect(() => {
    if (email === '' || password === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={isMobile ? 'login login-mobile' : 'login'}>
      <form className='loginForm' onSubmit={handleSubmit}>
        <span className='loginTitle'>Login</span>
        <label>E-mail</label>
        <input
          type='text'
          className='loginInput box-shadow'
          placeholder='Enter your email...'
          onChange={(e) => {
            setEmail(e.target.value.trim());
            setError(false);
          }}
        />
        <label>Password</label>
        <input
          type='password'
          className='loginInput box-shadow'
          placeholder='Enter your password...'
          onChange={(e) => {
            setPassword(e.target.value.trim());
            setError(false);
          }}
        />
        <button
          className='loginButton box-shadow'
          type='submit'
          disabled={isDisabled}
        >
          Login
        </button>
        <Link to={'/register'}>
          <button className='loginRegisterButton box-shadow'>Register</button>
        </Link>
      </form>
      {error && (
        <span
          style={{
            color: 'red',
            fontFamily: `'Josefin Sans', sans-serif`,
            fontSize: '1.5rem',
            marginTop: '3rem',
          }}
        >
          Invalid credentials. Please try again
        </span>
      )}
    </div>
  );
}
