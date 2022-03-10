import { useContext, useEffect } from 'react';
import './singlePost.css';
import SinglePostContent from '../../components/singlePostContent/SinglePostContent';
import { Context } from '../../context/Context';

export default function SinglePost() {
  const { isMobile, setToDesktopMode } = useContext(Context);

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        isMobile ? 'mobileSinglePostPage singlePostPage' : 'singlePostPage'
      }
    >
      <SinglePostContent />
    </div>
  );
}
