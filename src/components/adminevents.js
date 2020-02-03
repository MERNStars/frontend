import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import styles from "../styles/admin.module.scss";
import { Menu, Segment, Card, Icon, Header, Placeholder } from "semantic-ui-react";
require("dotenv").config();

export default class AdminEvents extends Component {
  state = { activeItem: 'Published Events' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  eventTab() {  
    const { activeItem } = this.state
    return(
      <>
      <Menu secondary>
      <Menu.Item
        name='Published Events'
        active={activeItem === 'Published Events'}
        onClick={this.handleItemClick}
        color="green"
      />
      <Menu.Item
        name='Unpublished Events'
        active={activeItem === 'Unpublished Events'}
        onClick={this.handleItemClick}
        color="green"
      />
      <Menu.Item
        name='Past Events'
        active={activeItem === 'Past Events'}
        onClick={this.handleItemClick}
        color="green"
        />
    </Menu>
        <Segment attached='bottom'>
        <Card.Group itemsPerRow={2}>
            <Card
                href="/create-event"
              >
                <Segment placeholder>
                <Header icon>
                    <Icon name='compose' />
                    Create New Event
                  </Header>
                </Segment>
              </Card>
          {this.props.events ?  
          this.state.activeItem === "Published Events" ? this.renderPublishedEvents() : this.state.activeItem === "Unpublished Events" ? this.renderUnpublishedEvents() : this.renderPastEvents() : 
          <Card>
            <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="very short" />
                <Placeholder.Line length="medium" />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
            </Card.Content>
          </Card>}
        </Card.Group>
        </Segment>
    </>
  )}

  renderPublishedEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.published && event.status !== "completed" ? (
          
          <AdminEventCard {...event} index={i} />
         
        ) : null;
        
      }))
  }

  renderUnpublishedEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.published ? null : (
          <AdminEventCard {...event} index={i} />
        );
      }))
  }

  renderPastEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.status === "completed" ? (
          <AdminEventCard {...event} index={i} />
        ) : null;
      }))
  }




  render() {
    return (
      this.eventTab()
    );
  }
}
