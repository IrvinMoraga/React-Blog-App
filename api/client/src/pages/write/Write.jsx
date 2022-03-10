import axios from 'axios';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './write.css';

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, isMobile, setToDesktopMode } = useContext(Context);

  useEffect(() => {
    if (title === '' && desc === '') {
      setIsDisabled(true);
    } else if (title === '') {
      setIsDisabled(true);
    } else if (desc === '') {
      setIsDisabled(true);
    } else if (title && desc) {
      setIsDisabled(false);
    }
  }, [title, desc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  };

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={isMobile ? 'write-mobile write' : 'write'}>
      <form className='writeForm' onSubmit={handleSubmit}>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      )}
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i class='writeIcon fa-solid fa-camera'></i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className='writeFormGroup'>
          <textarea
            placeholder='Tell your story...'
            type='text'
            className='writeInput writeText'
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <button className='writeSubmit' type='submit' disabled={isDisabled}>
          Publish
        </button>
      </form>
    </div>
  );
}
