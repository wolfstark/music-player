import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playersActions from '../../actions/player';
import { ERR_OK } from '../../api/config';
import { getSingerDetail } from '../../api/singer';
import { createSong } from '../../common/js/song';
import MusicList from '../../components/MusicList';

class SingerDetail extends Component {
  static propTypes = {
    singer: PropTypes.object,
    history: PropTypes.object.isRequired,
    setSelectPlay: PropTypes.func.isRequired
  };
  static defaultProps = {
    singer: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this._getDetail();
  }
  render() {
    const { singer, setSelectPlay } = this.props;
    const { songs } = this.state;
    return (
      <MusicList setSelectPlay={setSelectPlay} singer={singer} songs={songs} />
    );
  }

  async _getDetail() {
    const { history, singer } = this.props;
    if (!singer.id) {
      history.push("/singer");
      return;
    }
    const { code, data } = await getSingerDetail(singer.id);
    if (code === ERR_OK) {
      this.setState({ songs: this._normalizeSongs(data.list) });
    }
  }

  _normalizeSongs(list) {
    let ret = [];
    list.forEach(item => {
      let { musicData } = item;
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData));
      }
    });
    return ret;
  }
}

const mapStateToProps = (state, ownProps) => {
  const singer = state.player.singer;
  return {
    singer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelectPlay: bindActionCreators(playersActions, dispatch).setSelectPlay
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);
