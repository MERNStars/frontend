import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Container, Card, Button, Icon } from "semantic-ui-react";
import styles from "../styles/aboutus.module.scss";

const items = [
  {
    image:
      require("../assets/outdoor.jpg"),
    header: "Group Activities",
    description:
      "Join us for our next activity. You can catch us berry picking, bike riding or camping"
  },
  {
    image: require("../assets/chef.png"),
    header: "Free Dinners and Cooking Classes",
    description:
      "We host regular vegetarian based dinners and simple cooking classes so you can learn how to eat and live better."
  },
  {
    image: require("../assets/friends.jpg"),
    header: "Health and Fitness Seminars",
    description:
      "Hear from qualified health professionals at our seminars and talks. Or come along to a fitness class at our community centre."
  }
];

class AboutUs extends Component {

  render() {
    return (
      <div className={styles.mainContainer}>
        <header>
          <h1>weExplore About</h1>
        </header>
        <div className={styles.section}>
            <h2>Our Story</h2>
            <Container text>
            <p>
              We're a diverse group of people who are interested in living a healthy lifestyle.<br />
              We spend our time enjoying healthy activities, as well as volunteering in the community. Our focus is on holistic health, involving physical, mental, social and spiritual well-being.<br />
              Our principles are Bible-based but we welcome anyone who's interested in experiencing warm friendship and better health.
            </p>
            </Container>
          
          <h2>Services</h2>
          <Card.Group centered items={items} />
        
          <h2>Want To Know More?</h2>
          <Container text>
            <List animated verticalAlign='middle' size='huge' >
              <List.Item>
                <Icon name='mobile alternate'/>
                <List.Content>
                  <Link to='/contact'><List.Header id={styles.list}>Get in touch</List.Header></Link>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name='bookmark outline'/>
                <List.Content>
                  <Link to='/events'><List.Header id={styles.list}>Explore events</List.Header></Link>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name='newspaper outline'/>
                <List.Content>
                  <List.Header id={styles.list}><a href="http://www.gatewaysda.org/">More Resources</a></List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Container>
        </div>
      </div>
    );
  }
}


export default AboutUs;
