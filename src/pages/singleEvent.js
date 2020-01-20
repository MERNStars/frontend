import React from 'react';

class mainEvent extends React.Component {

  
  
  render(){
    console.log( this.props.match.params.id )
    return(
      <h1>Hello World</h1>
    )
  }
}

export default mainEvent