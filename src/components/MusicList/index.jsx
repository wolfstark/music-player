import classnames from 'classnames/bind';
import React from 'react';

import Loading from '../Loading';
import Scroll from '../Scroll';
import SongList from '../SongList';
import style from './style.scss';

const cn = classnames.bind(style);

const MusicList = props => {
  // static propTypes = {
  //   singer: PropTypes.object.isRequired,
  //   songs: PropTypes.array.isRequired,
  //   onScroll: PropTypes.func.isRequired,
  //   back: PropTypes.func.isRequired,
  //   random: PropTypes.func.isRequired,
  //   selectItem: PropTypes.func.isRequired
  // };

  // render() {
  const { songs, singer, onScroll, back, random, selectItem } = props;
  const { name, avatar } = singer;
  return (
    <div className={style.musicList}>
      <div onClick={back} className={style.back}>
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
            onClick={random}
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
        onScroll={onScroll}
        probeType={3}
        className={style.songListWrapper}
        ref="list"
      >
        <SongList songs={songs} rank={false} selectItem={selectItem} />
        <div
          className={cn({
            loadingContainer: true,
            loadingContainerHide: songs.length > 0
          })}
        >
          <Loading />
        </div>
      </Scroll>
    </div>
  );
  // }
};

export default MusicList;
