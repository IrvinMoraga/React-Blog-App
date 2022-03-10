import './settings.css';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const PF = 'http://localhost:5000/images/';

  const { user, dispatch, isMobile, setToDesktopMode } = useContext(Context);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
  }, [user.username, user.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    let updatedUser = {
      userId: user._id,
      username,
      email,
    };
    if (password) {
      updatedUser = {
        userId: user._id,
        username,
        email,
        password,
      };
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      console.log(`${username}   ${password}   ${email}   ${file}`);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      setIsDisabled(true);
      window.alert('Successfully updated.');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
      setShowError(true);
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (username === '' || email === '') {
      setIsDisabled(true);
    }
  }, [username, email]);

  let imgsrc;

  if (file) {
    imgsrc = URL.createObjectURL(file);
  } else if (!user.profilePic) {
    imgsrc = 'http://cdn.onlinewebfonts.com/svg/img_24787.png';
  } else if (user.profilePic) {
    imgsrc = PF + user.profilePic;
  }

  return (
    <div className={isMobile ? 'settings-mobile settings' : 'settings'}>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Account Update</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img src={imgsrc} alt='' />
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon fa-solid fa-arrow-up-from-bracket'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setSuccess(false);
                setIsDisabled(false);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setSuccess(false);
              setIsDisabled(false);
              setShowError(false);
            }}
          />
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSuccess(false);
              setIsDisabled(false);
              setShowError(false);
            }}
          />
          <label>Password</label>
          <input
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
              setSuccess(false);
              setIsDisabled(false);
            }}
          />
          <button
            className='settingsSubmit'
            type='submit'
            disabled={isDisabled}
          >
            Update
          </button>
          {success && (
            <span className='successMessage'>Profile has been updated...</span>
          )}
          {showError && (
            <span className='errorMessage'>
              Username or email is already taken.
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
