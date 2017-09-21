import React from "react";
import BannerItem from "./BannerItem";
import style from "./style.scss";
import classnames from "classnames";
import { Component } from "react";

const cx = classnames.bind(style);

class Banner extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dots: [],
      currentPageIndex: 0
    };
  }

  render() {
    return (
      <div className={style.slider}>
        <div className={style.sliderGroup}>{this.props.children}</div>
        <div className={style.dots}>
          {this.state.dots.map((dot, index) => (
            <span
              className={cx({
                dot: true,
                dotActive: this.state.currentPageIndex === index
              })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export { Banner, BannerItem };
export default Banner;
