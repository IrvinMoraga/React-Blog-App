import { useContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const { isMobile, setToDesktopMode } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      window.alert('User registered!');
      res.data && window.location.replace('/login');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (username === '' || email === '' || password === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [username, email, password]);

  return (
    <div className={isMobile ? 'register register-mobile' : 'register'}>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type='text'
          className='registerInput box-shadow'
          placeholder='Enter your username...'
          onChange={(e) => {
            setUsername(e.target.value.trim());
            setError(false);
          }}
        />
        <label>Email</label>
        <input
          type='email'
          className='registerInput box-shadow'
          placeholder='Enter your email...'
          onChange={(e) => {
            setEmail(e.target.value.trim());
            setError(false);
          }}
        />
        <label>Password</label>
        <input
          type='password'
          className='registerInput box-shadow'
          placeholder='Enter your password...'
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
        <button
          className='registerButton box-shadow'
          type='submit'
          disabled={isDisabled}
        >
          Register
        </button>
        <Link to={'/login'}>
          <button className='registerLoginButton box-shadow'>Login</button>
        </Link>
      </form>
      {error && (
        <span
          style={{
            color: 'tomato',
            fontFamily: `'Josefin Sans', sans-serif`,
            fontSize: '1.5rem',
            marginTop: '3rem',
          }}
        >
          Username or email is already taken.
        </span>
      )}
    </div>
  );
}
