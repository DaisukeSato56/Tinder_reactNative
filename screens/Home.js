import React from "react";
import styles from "../styles";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { getCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";

class Card extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.card} source={{ uri: this.props.images[2] }} />
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View>
        <Text>No more cards</Text>
      </View>
    );
  }
}

class Home extends React.Component {
  state = {
    cards: [
      {
        name: "fran",
        image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif"
      },
      {
        name: "jackie",
        image: "https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif"
      },
      {
        name: "phil",
        image: "https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif"
      },
      {
        name: "jacks",
        image: "https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif"
      },
      {
        name: "mellow",
        image: "https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif"
      },
      {
        name: "frank",
        image: "https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif"
      },
      {
        name: "timmmay",
        image: "https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif"
      }
    ]
  };

  componentWillMount() {
    this.props.getCards();
  }

  handleYup(card) {
    console.log(`Yup for ${card.name}`);
  }

  handleNope(card) {
    console.log(`Nope for ${card.name}`);
  }

  handleMaybe(card) {
    console.log(`Maybe for ${card.name}`);
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}
      />
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn, cards: state.cards };
};

export default connect(
  mapStateToProps,
  { getCards }
)(Home);
