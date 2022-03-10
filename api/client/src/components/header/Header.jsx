import { useContext, useEffect } from 'react';
import './header.css';
import { Context } from '../../context/Context';

export default function Header() {
  const { isMobile, setToDesktopMode } = useContext(Context);

  useEffect(() => {
    setToDesktopMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={isMobile ? 'header-mobile' : 'header'}>
      <div className='headerTitles'>
        <span className='headerTitleSm'>A Simple</span>
        <span className='headerTitleLg'>Blog App</span>
      </div>
      <img
        className='headerImg'
        src='https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        alt=''
      />
    </div>
  );
}
