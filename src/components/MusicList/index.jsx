import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { prefixStyle } from "../../common/js/dom";
// import { playlistMixin } from '../../common/js/mixin';
import Loading from "../Loading";
import style from "./style.scss";
import SongList from "../SongList";
import classnames from "classnames/bind";
import Scroll from "../Scroll";

const cn = classnames.bind(style);
const RESERVED_HEIGHT = 40;

class MusicList extends PureComponent {
  static propTypes = {
    singer: PropTypes.object,
    songs: PropTypes.array
  };
  static defaultProps = {
    singer: {}
  };
  imageHeight: 0;
  minTransalteY: 0;

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {
    this.imageHeight = this.refs.bgImage.clientHeight;
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT;
    // this.refs.list.$el.style.top = `${this.imageHeight}px`;
    findDOMNode(this.refs.list).style.top = `${this.imageHeight}px`;
    // console.log(list);
    // ReactDOM.findDOMNod;
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    const { songs, singer } = this.props;
    const { name, avatar } = singer;
    return (
      <div className={style.musicList}>
        <div className={style.back}>
          <i className={cn("icon-back", style.iconBack)} />
        </div>
        <h1 className={style.title}>{name}</h1>
        <div
          className={style.bgImage}
          style={{ backgroundImage: `url(${avatar})` }}
          ref="bgImage"
        >
          <div className={style.playWrapper}>
            <div
              ref="playBtn"
              className={cn({ play: true, playHide: songs.length === 0 })}
            >
              <i className={cn("icon-play", style.iconPlay)} />
              <span className={style.text}>随机播放全部</span>
            </div>
          </div>
          <div className={style.filter} ref="filter" />
        </div>
        <div className={style.bgLayer} ref="layer" />
        <Scroll
          data={songs}
          onScroll={this.onScroll.bind(this)}
          probeType={3}
          className={style.songListWrapper}
          ref="list"
        >
          <SongList
            songs={songs}
            rank={false}
            selectItem={this.selectItem.bind(this)}
          />
        </Scroll>
        <div
          className={{
            loadingContainer: true,
            loadingContainerHide: songs.length > 0
          }}
        >
          <Loading />
        </div>
      </div>
    );
  }
  handlePlaylist(playlist) {
    const bottom = playlist.length > 0 ? "60px" : "";
    this.$refs.list.$el.style.bottom = bottom;
    this.$refs.list.refresh();
  }
  onScroll(pos) {
    this.scrollY = pos.y;
  }
  back() {
    this.$router.back();
  }
  selectItem(item, index) {
    this.selectPlay({
      list: this.songs,
      index
    });
  }
  random() {
    this.randomPlay({
      list: this.songs
    });
  }
}

export default MusicList;
