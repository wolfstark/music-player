import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./style.scss";

class SongList extends Component {
  static propsType = {
    songs: PropTypes.array.isRequired,
    selectItem: PropTypes.func.isRequired,
    rank: PropTypes.bool
  };
  static defaultProps = {
    rank: false
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ul>
          {this.props.songs.map((song, index) => (
            <li
              onClick={this.selectItem(song, index).bind(this)}
              className={style.item}
            >
              <div className={style.rank} v-show="rank">
                <span className={this.getRankCls(index)}>
                  {this.getRankText(index)}
                </span>
              </div>
              <div className="content">
                <h2 className="name">{song.name}</h2>
                <p className="desc">{this.getDesc(song)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  selectItem(item, index) {
    this.props.selectItem(item, index);
  }
  getDesc(song) {
    return `${song.singer}·${song.album}`;
  }
  getRankCls(index) {
    if (index <= 2) {
      return `${style.icon} ${style[`icon${index}`]}`;
    } else {
      return style.text;
    }
  }
  getRankText(index) {
    if (index > 2) {
      return index + 1;
    }
  }
}

export default SongList;
