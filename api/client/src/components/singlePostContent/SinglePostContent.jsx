import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import './singlePostContent.css';

export default function SinglePostContent() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setDate(new Date(res.data.updatedAt).toLocaleString());
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    setUpdateMode(false);
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title.trim(),
        desc: desc.trim(),
      });
      setUpdateMode(false);
      window.location.replace(`/post/${post._id}`);
    } catch (err) {}
  };

  useEffect(() => {
    if (updateMode === true) {
      if (title === '' && desc === '') {
        setShowError(true);
        setErrorMessage('Please enter both a title and description');
      } else if (title === '') {
        setShowError(true);
        setErrorMessage('Please enter a title');
      } else if (desc === '') {
        setShowError(true);
        setErrorMessage('Please enter a description');
      } else {
        setShowError(false);
      }
    }
  }, [updateMode, title, desc]);

  return (
    <div className='singlePostContent'>
      <div className='singlePostContentWrapper'>
        {post.photo ? (
          <img
            className='singlePostContentImage'
            src={PF + post.photo}
            alt='imagePlaceholder'
          />
        ) : (
          <img
            className='singlePostContentImage'
            src='https://i.ibb.co/gTGk2XF/New-Post-1.png'
            alt='imagePlaceholder'
          />
        )}

        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlePostContentTitleInput'
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <>
            <div className='titleContainer'>
              <h1 className='singlePostContentTitle'>{title}</h1>
            </div>
            {post.username === user?.username && (
              <div className='singlePostContentEdit'>
                <i
                  class='singlePostContentIcon fa-solid fa-pen-to-square'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  class='singlePostContentIcon fa-solid fa-trash-can'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </>
        )}

        <div className='singlePostContentInfo'>
          <div className='singlePostContentAuthor'>
            Author:
            <Link
              to={`/?user=${post.username}`}
              className='singlePostContentAuthorLink'
            >
              <b> {post.username}</b>
            </Link>
          </div>
          <div className='singlePostDate'>{date}</div>
        </div>

        {updateMode ? (
          <textarea
            className='singlePostContentDescInput'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className='singlePostContentDesc'>{desc}</p>
        )}

        {updateMode && (
          <button
            className='singlePostContentButton'
            onClick={handleUpdate}
            disabled={showError}
          >
            Update
          </button>
        )}

        {showError && (
          <span className='updateErrorMessage'>{errorMessage}</span>
        )}
      </div>
    </div>
  );
}
