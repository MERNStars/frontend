import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Segment, Container, Card, Button } from "semantic-ui-react";
import styles from "../styles/aboutus.module.scss";

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    header: "Service 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    header: "Service 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    image:
      "https://images.unsplash.com/photo-1549227082-0ea18ce30397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    header: "Service 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  }
];

export default class AboutUs extends Component {
  render() {
    return (
      <div className="About-us">
        <h1>About Us</h1>
        <Container>
          <Segment>
            <h2>Our Story</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Segment>
        </Container>
        <div className={styles.section}>
          <h1>Other Services</h1>
          <Card.Group centered items={items} />
        </div>

        <div className={styles.section}>
          <h2>Want To Know More?</h2>
          <Container>
            <Link exact to="/contact">
              <Button fluid negative>
                Contact Us
              </Button>
            </Link>
          </Container>
        </div>

      </div>
    );
  }
}
