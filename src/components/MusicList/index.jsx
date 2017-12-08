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
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");

class MusicList extends PureComponent {
  static propTypes = {
    singer: PropTypes.object,
    songs: PropTypes.array.isRequired,
    setSelectPlay: PropTypes.func.isRequired
  };
  static defaultProps = {
    singer: {}
  };
  imageHeight: 0;
  minTransalteY: 0;
  titleHeight: 0;

  componentDidMount() {
    this.imageHeight = this.refs.bgImage.clientHeight;
    this.titleHeight = this.refs.title.clientHeight;
    this.minTransalteY = -this.imageHeight + this.titleHeight;
    findDOMNode(this.refs.list).style.top = `${this.imageHeight}px`;
  }
  render() {
    const { songs, singer } = this.props;
    const { name, avatar } = singer;
    return (
      <div className={style.musicList}>
        <div className={style.back}>
          <i className={cn("icon-back", style.iconBack)} />
        </div>
        <h1 ref="title" className={style.title}>
          {name}
        </h1>
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
          className={cn({
            loadingContainer: true,
            loadingContainerHide: songs.length > 0
          })}
        >
          <Loading />
        </div>
      </div>
    );
  }
  handlePlaylist(playlist) {
    const bottom = playlist.length > 0 ? "60px" : "";
    findDOMNode(this.$refs.list).style.bottom = bottom;
    console.log(this.$refs.list);
    this.refs.list.refresh();
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

    this.refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
    this.refs.filter.style[backdrop] = `blur(${blur}px)`;
    if (y < this.minTransalteY) {
      zIndex = 10;
      this.refs.bgImage.style.paddingTop = 0;
      this.refs.bgImage.style.height = `${this.titleHeight}px`;
      this.refs.playBtn.style.display = "none";
    } else {
      this.refs.bgImage.style.paddingTop = "5.25rem";
      this.refs.bgImage.style.height = 0;
      this.refs.playBtn.style.display = "";
    }
    this.refs.bgImage.style[transform] = `scale(${scale})`;
    this.refs.bgImage.style.zIndex = zIndex;
  }
  back() {
    this.$router.back();
  }
  selectItem(index) {
    this.props.setSelectPlay({
      list: this.props.songs,
      index
    });
  }
  random() {
    this.randomPlay({
      list: this.state.songs
    });
  }
}

export default MusicList;
