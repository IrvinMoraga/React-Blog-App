import './topNavBar.css';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

export default function TopNavBar() {
  const { user, dispatch, isMobile, toggleMobile, setToDesktopMode } =
    useContext(Context);
  const [width, setWidth] = useState(window.innerWidth);
  const PF = 'http://localhost:5000/images/';

  const handleToggleMobile = () => {
    toggleMobile();
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (width > 1201) {
      setToDesktopMode();
    }

    window.addEventListener('resize', handleResize);
  }, [width, setToDesktopMode]);

  return (
    <div className='topNavBar'>
      <ul
        className={isMobile ? 'mobileTopNavBarSections' : 'topNavBarSections'}
      >
        <li className='topNavBarSection topLeft'>
          <i
            className='topIcon link fa-brands fa-facebook-square'
            onClick={() => {
              window.open('https://www.facebook.com/irvinmoraga347/', '_blank');
            }}
          ></i>
          <i
            className='topIcon link fa-brands fa-twitter-square'
            onClick={() => {
              window.open('https://twitter.com/irvinmeowraga', '_blank');
            }}
          ></i>
          <i
            className='topIcon link fa-brands fa-instagram-square'
            onClick={() => {
              window.open('https://www.instagram.com/irvin.moraga/', '_blank');
            }}
          ></i>
        </li>
        <li
          className={
            user
              ? 'topNavBarSection topCenter'
              : 'topNavBarSection topCenter topCenterGuest'
          }
        >
          <ul className='topLinks'>
            <li>
              <Link className='link textLink' to={'/'}>
                HOME
              </Link>
            </li>
            <li>
              <Link className='link textLink' to={'/write'}>
                WRITE
              </Link>
            </li>
            <li
              className={
                user ? 'link textLink' : 'link textLink logoutButtonHide'
              }
              onClick={handleLogout}
            >
              {user && 'LOGOUT'}
            </li>
          </ul>
        </li>
        <li className='topNavBarSection topRight'>
          <ul className='topLinks'>
            <li>
              {user ? (
                <Link to={'/settings'}>
                  <img
                    className='topImage'
                    src={
                      !user.profilePic
                        ? 'http://cdn.onlinewebfonts.com/svg/img_24787.png'
                        : PF + user.profilePic
                    }
                    alt=''
                  />
                </Link>
              ) : (
                <ul className='topLinks'>
                  <li>
                    <Link className='link textLink' to='/login'>
                      LOGIN
                    </Link>
                  </li>
                  <li>
                    <Link className='link textLink' to='/register'>
                      REGISTER
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </li>
      </ul>
      <Link className='link' to={'/'}>
        <p className='headerMobileMode'>React Blog App</p>
      </Link>
      <button className='toggleNavBar' onClick={handleToggleMobile}>
        {isMobile ? (
          <FontAwesomeIcon className='toggleIcon' icon={faTimes} />
        ) : (
          <FontAwesomeIcon className='toggleIcon' icon={faBars} />
        )}
      </button>
    </div>
  );
}

// <div className={isMobile ? 'top mobileTop box-shadow' : 'top box-shadow'}>
//   <div className='topLeft topNavBarLink'>
//     <i
//       className='topIcon fa-brands fa-facebook-square'
//       onClick={() => {
//         window.open('https://www.facebook.com/irvinmoraga347/', '_blank');
//       }}
//     ></i>
//     <i
//       className='topIcon fa-brands fa-twitter-square'
//       onClick={() => {
//         window.open('https://twitter.com/irvinmeowraga', '_blank');
//       }}
//     ></i>
//     <i
//       className='topIcon fa-brands fa-instagram-square'
//       onClick={() => {
//         window.open('https://www.instagram.com/irvin.moraga/', '_blank');
//       }}
//     ></i>
//   </div>
//   <div className='topCenter'>
//     <ul className='topList'>
//       <li className='topListItem topNavBarLink'>
//         <Link className='link' to={'/'}>
//           HOME
//         </Link>
//       </li>
//       <li className='topListItem topNavBarLink'>
//          <Link className='link' to={'/write'}>
//           WRITE
//         </Link>
//       </li>
//       <li className='topListItem topNavBarLink' onClick={handleLogout}>
//         {user && 'LOGOUT'}
//       </li>
//     </ul>
//   </div>
//   <div className='topRight'>
// {user ? (
//   <Link to={'/settings'}>
//     <img
//       className='topImage'
//       src={
//         !user.profilePic
//           ? 'http://cdn.onlinewebfonts.com/svg/img_24787.png'
//           : PF + user.profilePic
//       }
//       alt=''
//     />
//   </Link>
//     ) : (
//       <ul className='topList'>
//         <li className='topListItem'>
//           <Link className='link' to='/login'>
//             LOGIN
//           </Link>
//         </li>
//         <li className='topListItem'>
//           <Link className='link' to='/register'>
//             REGISTER
//           </Link>
//         </li>
//       </ul>
//     )}
//   </div>
// </div>
