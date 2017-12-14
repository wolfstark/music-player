import React from "react";
import style from "./style.scss";
// import { isShow } from "../../common/js/style";
// import PropTypes from "prop-types";
import classnames from "classnames/bind";

const cn = classnames.bind(style);

const Player = props => {
  // static propTypes = {
  //   playlist: PropTypes.array,
  //   playingLyric: PropTypes.string,
  //   currentLyric: PropTypes.object,
  //   format: PropTypes.func,
  //   currentTime: PropTypes.number,
  //   currentSong: PropTypes.object,
  //   cdCls: PropTypes.func,
  //   currentLineNum: PropTypes.number,
  //   currentShow: PropTypes.string,
  //   disableCls: PropTypes.func,
  //   songReady:PropTypes.bool
  // };

  // render() {
  const {
    playlist,
    playingLyric,
    currentLyric,
    format,
    currentTime,
    currentSong,
    cdCls,
    currentLineNum,
    currentShow,
    disableCls
  } = props;
  return (
    <div>
      {/*style={isShow(playlist.length > 0)}*/}
      <div className={style.normalPlayer} v-show="fullScreen">
        <div className="background">
          <img width="100%" height="100%" alt="" src="currentSong.image" />
        </div>
        <div className="top">
          <div className="back" click="back">
            <i className="icon-back" />
          </div>
          <h1 className="title">{currentSong.name}</h1>
          <h2 className="subtitle">{currentSong.singer}</h2>
        </div>
        <div
          className="middle"
          touchstart="middleTouchStart"
          touchmove="middleTouchMove"
          touchend="middleTouchEnd"
        >
          <div className="middle-l" ref="middleL">
            <div className="cd-wrapper" ref="cdWrapper">
              <div className={cn("cd", cdCls())}>
                <img className="image" alt="" src="currentSong.image" />
              </div>
            </div>
            <div className="playing-lyric-wrapper">
              <div className="playing-lyric">{playingLyric}</div>
            </div>
          </div>
          <scroll
            className="middle-r"
            ref="lyricList"
            data="currentLyric && currentLyric.lines"
          >
            <div className="lyric-wrapper">
              <div v-if="currentLyric">
                {currentLyric.lines.map((line, index) => (
                  <p
                    ref="lyricLine"
                    className={cn({
                      text: true,
                      current: currentLineNum === index
                    })}
                  >
                    {line.txt}
                  </p>
                ))}
              </div>
            </div>
          </scroll>
        </div>
        <div className="bottom">
          <div className="dot-wrapper">
            <span className={cn({ dot: true, active: currentShow === "cd" })} />
            <span
              className={cn({ dot: true, active: currentShow === "lyric" })}
            />
          </div>
          <div className="progress-wrapper">
            <span className="time time-l">{format(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <progress-bar
                percent="percent"
                percentChange="onProgressBarChange"
              />
            </div>
            <span className="time time-r">{format(currentSong.duration)}</span>
          </div>
          <div className="operators">
            <div className="icon i-left" click="changeMode">
              <i className="iconMode" />
            </div>
            <div className={cn("iLeft", disableCls())}>
              <i click="prev" className="icon-prev" />
            </div>
            <div className="icon i-center" className="disableCls">
              <i click="togglePlaying" className="playIcon" />
            </div>
            <div className="icon i-right" className="disableCls">
              <i click="next" className="icon-next" />
            </div>
            <div className="icon i-right">
              <i
                click="toggleFavorite(currentSong)"
                className="icon"
                className="getFavoriteIcon(currentSong)"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mini-player" v-show="!fullScreen" click="open">
        <div className="icon">
          <img
            className="cdCls"
            width="40"
            height="40"
            src="currentSong.image"
          />
        </div>
        <div className="text">
          <h2 className="name" v-html="currentSong.name" />
          <p className="desc" v-html="currentSong.singer" />
        </div>
        <div className="control">
          <progress-circle radius="radius" percent="percent">
            <i
              click="togglePlaying"
              className="icon-mini"
              className="miniIcon"
            />
          </progress-circle>
        </div>
        <div className="control" click="showPlaylist">
          <i className="icon-playlist" />
        </div>
      </div>
      <playlist ref="playlist" />
      <audio
        ref="audio"
        src="currentSong.url"
        play="ready"
        error="error"
        timeupdate="updateTime"
        ended="end"
      />
    </div>
  );
};
// }

export default Player;
