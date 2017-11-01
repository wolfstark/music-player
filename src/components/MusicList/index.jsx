import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicList extends Component {
  static propTypes = {
    singer: PropTypes.object,
    history: PropTypes.object.isRequired,
  };
  static defaultProps = {
    singer: {},
  };
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return <div />;
  }
  _getDetail() {
    const { history, singer } = this.props;
    if (!singer.id) {
      history.push('/singer');
      return;
    }
    getSingerDetail(this.singer.id).then(res => {
      if (res.code === ERR_OK) {
        this.songs = this._normalizeSongs(res.data.list);
      }
    });
  }
}

MusicList.propTypes = {};

export default MusicList;
