import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { playerHOC } from "../../common/js/HOCs";
import Player from '../../components/Player'

class PlayerContainer extends Component {
  static propTypes = {
    iconMode: PropTypes.func,
    getFavoriteIcon: PropTypes.fun,
    toggleFavorite: PropTypes.fun,
    changeMode: PropTypes.fun,
    playlist: PropTypes.array.isRequired,
    sequenceList: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    favoriteList: PropTypes.array.isRequired,
    currentSong: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }

  render() {
    return <Player />;
  }
}

PlayerContainer.propTypes = {};

export default connect()(playerHOC(PlayerContainer));
