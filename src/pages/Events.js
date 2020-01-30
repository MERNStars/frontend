import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/events.module.scss";
import EventCard from "../components/eventCard";
import SearchBar from "../components/searchBar";
import { Card, Placeholder } from 'semantic-ui-react';
require("dotenv").config();

export default class Events extends Component {
  state = {
    events: null
  }
  
  async componentDidMount() {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_DB_URL}/events`)
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
    const data = await response.data;
    this.setState({ events: data });
  }

  categorySearch = (events) => {
    console.log( events )
      this.setState( {events: events});
  }

  placeHolderCards() {
    if( this.state.events === null){
      return(
        <Card>
        <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length='very short' />
              <Placeholder.Line length='medium' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
        <Placeholder>
          <Placeholder.Paragraph>
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
        </Card.Content>
      </Card>
      )} else {
        console.log( `Hello NO EVENTS`)
        return (
          <div className={styles.errorContainer}>
            <h1> Oops! No events found</h1>
            </div>
        )}
  }

  render() {
    const {events} = this.state
    return(
      <div className={styles.mainContainer}>
        <header><h1>weExplore Events</h1></header>
        <SearchBar categorySearch={this.categorySearch}/>
        <>
          {events && events.length > 0 ? 
          <Card.Group itemsPerRow={4} centered>
          {events.map( (event, i) => {
            if( event.published && event.status !== "completed" ){
              console.log( `Hello Events Here`)
              return(< EventCard 
                { ...event} 
                index={i}/>)
            } else {
              this.placeHolderCards()
            }
          })}
            </Card.Group> : this.placeHolderCards()}
        </>
      </div>
    );
  }
}
