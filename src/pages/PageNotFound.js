import React from 'react';
import styles from '../styles/home.module.scss';
import {Link} from 'react-router-dom';

class PageNotFound extends React.Component {
  render(){
    return(
      <div className={styles.NotFoundContainer}>
        <div>
          <h1>404 ERROR..BEEP..BOOP...BEEP!<br />
            Route does not exist</h1>
            <Link exact to="/">
              <h3>Return To Home Page</h3>
            </Link>
        </div>
        <div>
          <img src={require('../assets/404_robot.png')} alt='404 error robot'/>
        </div>
      </div>
    )
  }
}

export default PageNotFound 