import PropTypes from "prop-types";
import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as playersActions from "../../actions/player";
import { ERR_OK } from "../../api/config";
import { getSingerDetail } from "../../api/singer";
import { prefixStyle } from "../../common/js/dom";
import { playlistHOC } from "../../common/js/HOCs";
import { createSong } from "../../common/js/song";
import MusicList from "../../components/MusicList";

const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");
class SingerDetail extends Component {
  static propTypes = {
    singer: PropTypes.object,
    history: PropTypes.object.isRequired,
    setSelectPlay: PropTypes.func.isRequired
  };
  static defaultProps = {
    singer: {}
  };
  musicList = null;
  imageHeight: 0;
  minTransalteY: 0;
  titleHeight: 0;

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this._getDetail();
  }
  componentDidMount() {
    this.musicList = this.refs.MusicList;
    this.imageHeight = this.musicList.refs.bgImage.clientHeight;
    this.titleHeight = this.musicList.refs.title.clientHeight;
    this.minTransalteY = -this.imageHeight + this.titleHeight;
    findDOMNode(this.musicList.refs.list).style.top = `${this.imageHeight}px`;
  }
  render() {
    const { singer } = this.props;
    const { songs } = this.state;
    const { onScroll, back, random, selectItem } = this;
    return (
      <MusicList
        ref="MusicList"
        singer={singer}
        songs={songs}
        onScroll={onScroll.bind(this)}
        back={back.bind(this)}
        random={random.bind(this)}
        selectItem={selectItem.bind(this)}
      />
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
  handlePlaylist(playlist) {
    const bottom = playlist.length > 0 ? "1.2rem" : "";
    findDOMNode(this.musicList.refs.list).style.bottom = bottom;
    this.musicList.refs.list.refresh();
  }
  onScroll({ y }) {
    const translateY = Math.max(this.minTransalteY, y);
    const percent = Math.abs(y / this.imageHeight);
    let scale = 1;
    let zIndex = 0;
    let blur = 0;
    if (y > 0) {
      scale = 1 + percent;
      zIndex = 10;
    } else {
      blur = Math.min(20, percent * 20);
    }

    this.musicList.refs.layer.style[
      transform
    ] = `translate3d(0,${translateY}px,0)`;
    this.musicList.refs.filter.style[backdrop] = `blur(${blur}px)`;
    if (y < this.minTransalteY) {
      zIndex = 10;
      this.musicList.refs.bgImage.style.paddingTop = 0;
      this.musicList.refs.bgImage.style.height = `${this.titleHeight}px`;
      this.musicList.refs.playBtn.style.display = "none";
    } else {
      this.musicList.refs.bgImage.style.paddingTop = "5.25rem";
      this.musicList.refs.bgImage.style.height = 0;
      this.musicList.refs.playBtn.style.display = "";
    }
    this.musicList.refs.bgImage.style[transform] = `scale(${scale})`;
    this.musicList.refs.bgImage.style.zIndex = zIndex;
  }
  back() {
    this.props.history.goBack();
  }
  selectItem(index) {
    this.props.setSelectPlay({
      list: this.state.songs,
      index
    });
  }
  random() {
    this.props.setRandomPlay(this.state.songs);
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
    setSelectPlay: bindActionCreators(playersActions, dispatch).setSelectPlay,
    setRandomPlay: bindActionCreators(playersActions, dispatch).setRandomPlay
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  playlistHOC(SingerDetail)
);
