import './sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebarContainer'>
      <div className='sidebar box-shadow'>
        <div className='sidebarItem'>
          <span className='sidebarTitle'>ABOUT THE CREATOR</span>
          <img
            className='box-shadow'
            src='https://scontent.fmnl5-2.fna.fbcdn.net/v/t1.6435-9/93244854_3194709710540048_4515416748849102848_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHpXl56Vh2ifIy9Ela_1Cvl4rjZRo5WyrTiuNlGjlbKtNjV8dUD3iRqgWsM2m383Kw3oqFDxP6wfI_TYDiUYzya&_nc_ohc=ohzgxAowj_YAX_ADC4M&_nc_ht=scontent.fmnl5-2.fna&oh=00_AT8IF1Yt5o50AQZ8w9zOC_-WUxiD1yH1V8abNV8uWc6pzw&oe=623CAF70'
            alt=''
          />
          <p className='sidebarText'>
            A 4th year IT student, aiming to pursue a career of Web Development
          </p>
        </div>
        <div className='sidebarItem'>
          <span className='sidebarTitle'>FOLLOW ME</span>
          <div className='sidebarSocial'>
            <i
              className='sidebarIcon fa-brands fa-facebook-square'
              onClick={() => {
                window.open(
                  'https://www.facebook.com/irvinmoraga347/',
                  '_blank'
                );
              }}
            ></i>
            <i
              className='sidebarIcon fa-brands fa-twitter-square'
              onClick={() => {
                window.open('https://twitter.com/irvinmeowraga', '_blank');
              }}
            ></i>
            <i
              className='sidebarIcon fa-brands fa-instagram-square'
              onClick={() => {
                window.open(
                  'https://www.instagram.com/irvin.moraga/',
                  '_blank'
                );
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
