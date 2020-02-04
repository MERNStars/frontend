import React from 'react';

import styles from '../../styles/event.module.scss';

class Presenters extends React.Component {

  adminDisplay = event => {
    console.log( this.props )
    return(
      event.presenters.map( (presenter) => {
        return(
          <p>{presenter.title} {presenter.first_name} {presenter.last_name}</p>
        )
      }))
  }

  eventDisplay = event => {
    const { presenter_detail } = event;
      return presenter_detail
        ? presenter_detail.map(presenter => {
            return (
              <>{presenter.title} {presenter.first_name} {presenter.last_name} <br /></>)})
          //     <div className={styles.presenterBox}>
          //       <div>
          //       <span>
          //         {presenter.title} {presenter.first_name} {presenter.last_name}
          //       </span>
          //       <br></br>
          //       <span>
          //         <sub>{presenter.qualification}</sub>
          //       </span>
          //       <span>
          //         <p>{presenter.short_description}</p>
          //       </span>
          //       </div>
          //       <img id={styles.profileImg} src={require("../../assets/profile-photo.jpg")} alt="profile of presenter"/>
          //     </div>
          //   );
          // })
        : null;
  }

  render() {
    if( this.props.location.pathname === "/admin")
    return (  
      
      this.adminDisplay(this.props)
    ); else 
    return( 
      this.eventDisplay(this.props)
     )
  } 
}

export default Presenters