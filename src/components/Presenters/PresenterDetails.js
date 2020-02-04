
import React from 'react';

import styles from '../../styles/event.module.scss';
import {Item} from 'semantic-ui-react';


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
        ? <Item.Group divided> {presenter_detail.map(presenter => {
            return (
              <Item vertical>
                <Item.Image  circular size='tiny' src={require('../../assets/user.svg')} />
                <Item.Content>
                  <Item.Header>{presenter.title} {presenter.first_name} {presenter.last_name}</Item.Header><br />
                  <Item.Meta>{presenter.qualification}</Item.Meta><br />
                {presenter.long_description}
                </Item.Content>
              </Item>)})
     
             } </Item.Group> : null;
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

export default Presenters;
