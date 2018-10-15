import React from "react";
import { connect } from "react-redux";
import { getCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";
import * as firebase from "firebase";

class Home extends React.Component {
  componentWillMount() {
    this.props.getCards();
  }

  handleYup(card) {
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: true });
  }

  handleNope(card) {
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: false });
  }

  handleMaybe(card) {
    console.log(`Maybe for ${card.name}`);
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe.bind(this)}
        hasMaybeAction={false}
      />
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn, cards: state.cards, user: state.user };
};

export default connect(
  mapStateToProps,
  { getCards }
)(Home);
