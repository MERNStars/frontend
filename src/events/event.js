import React from 'react';

class Event extends React.Component {

  render() {
    const { title} = this.props.event
    return(
      <div>
        <h1>{title}</h1>
      </div>
    )
  }

}

export default Event