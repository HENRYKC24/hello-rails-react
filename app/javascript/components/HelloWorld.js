import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { List } from "semantic-ui-react";

export const GET_THINGS_REQUEST = "GET_THINGS_REQUEST";
export const GET_THINGS_SUCCESS = "GET_THINGS_SUCCESS";

function getThings() {
  return (dispatch) => {
    dispatch({ type: GET_THINGS_REQUEST });
    return fetch(`v1/greetings.json`)
      .then((response) => response.json())
      .then((json) => dispatch(getThingsSuccess(json)))
      .catch((error) => console.log(error));
  };
}

export function getThingsSuccess(json) {
  return {
    type: GET_THINGS_SUCCESS,
    json,
  };
}

class HelloWorld extends React.Component {
  render() {
    const { greetings } = this.props;
    const thingsList = [greetings].map((greeting) => {
      return (
        <List.Item className="list">
          <List.Content>
            <List.Header>{greeting.message}</List.Header>
            
          </List.Content>
        </List.Item>
      );
    });
    return (
      <React.Fragment>
        <h1 className="app-name">Greetings App</h1>
        <ul className="greetings">{thingsList}</ul>
        <buttton
          className="greeting-btn"
          onClick={() => this.props.getThings()}
        >
          Greet
        </buttton>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getThings };

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};
export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
