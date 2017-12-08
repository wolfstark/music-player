import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./style.scss";
import classnames from "classnames/bind";

const cn = classnames.bind(style);

class SongList extends Component {
  static propsType = {
    songs: PropTypes.array.isRequired,
    selectItem: PropTypes.func.isRequired,
    rank: PropTypes.bool
  };
  static defaultProps = {
    rank: false
  };

  render() {
    const rank = this.props.rank;
    return (
      <div>
        <ul>
          {this.props.songs.map((song, index) => (
            <li
              key={index}
              onClick={this.selectItem.bind(this, index)}
              className={style.item}
            >
              <div className={cn({ rank: true, rankHide: !rank })}>
                <span className={this.getRankCls(index)}>
                  {this.getRankText(index)}
                </span>
              </div>
              <div className={style.content}>
                <h2 className={style.name}>{song.name}</h2>
                <p className={style.desc}>{this.getDesc(song)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  selectItem(index) {
    this.props.selectItem(index);
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
