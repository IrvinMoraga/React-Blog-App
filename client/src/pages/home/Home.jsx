import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import './home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { setToDesktopMode } = useContext(Context);
  let postsObtained;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  if (posts.length !== 0) {
    postsObtained = <Posts posts={posts} />;
  } else {
    postsObtained = (
      <div className='noPostsFoundDiv'>
        <h1 className='noPostsFoundHeader'>No posts found!</h1>
      </div>
    );
  }

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='homeContainer'>
      <Header />
      <div className='home'>
        {postsObtained}
        <Sidebar />
      </div>
    </div>
  );
}
