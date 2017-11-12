import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { prefixStyle } from '../../common/js/dom';
// import { playlistMixin } from '../../common/js/mixin';
import Loading from '../Loading';
import style from './style.scss';
import SongList from '../SongList';
import classnames from 'classnames/bind';

const cn = classnames.bind(style);
class MusicList extends PureComponent {
  static propTypes = {
    singer: PropTypes.object,
    songs: PropTypes.array,
  };
  static defaultProps = {
    singer: {},
    songs: [],
  };
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {}

  componentDidMount() {}

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
          <i className={cn('icon-back', style.iconBack)} />
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
              <i className={cn('icon-play', style.iconPlay)} />
              <span className={style.text}>随机播放全部</span>
            </div>
          </div>
          <div className={style.filter} ref="filter" />
        </div>
        <div className={style.bgLayer} ref="layer" />
        <div className={style.songListWrapper} ref="list">
          <SongList songs={songs} rank={false} select="selectItem" />
        </div>
        <div
          className={{
            loadingContainer: true,
            loadingContainerHide: songs.length > 0,
          }}
        >
          <Loading />
        </div>
      </div>
    );
  }
}

export default MusicList;
