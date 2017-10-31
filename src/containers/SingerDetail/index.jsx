import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MusicList from '../../components/MusicList';
import { ERR_OK } from '../../api/config';
import { getSingerDetail } from '../../api/singer';
// import { createSong } from '../../common/js/song';

// import { actionCreator } from 'actionCreatorPath';

class SingerDetail extends Component {
  static propTypes = {
    songs: PropTypes.array,
  };
  static defaultProps = {
    songs: [],
  };
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this._getDetail();
  }

  render() {
    return <MusicList />;
  }

  _getDetail() {
    // if (!this.singer.id) {
    //   this.$router.push('/singer');
    //   return;
    // }
    // getSingerDetail(this.singer.id).then(res => {
    //   if (res.code === ERR_OK) {
    //     this.songs = this._normalizeSongs(res.data.list);
    //   }
    // });
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    // prop: state.prop,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch1: () => {
    //   dispatch(actionCreator);
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);
