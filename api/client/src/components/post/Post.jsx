import './post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const PF = 'http://localhost:5000/images/';
  return (
    <div className='post'>
      {post.photo ? (
        <Link to={`/post/${post._id}`}>
          <img className='postImg' src={PF + post.photo} alt='' />
        </Link>
      ) : (
        <Link to={`/post/${post._id}`}>
          <img
            className='postImg'
            src='https://i.ibb.co/gTGk2XF/New-Post-1.png'
            alt=''
          />
        </Link>
      )}
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map((c) => (
            <span className='postCat'>{c}</span>
          ))}
        </div>
        {}
        <Link to={`/post/${post._id}`} className='title-link'>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  );
}
