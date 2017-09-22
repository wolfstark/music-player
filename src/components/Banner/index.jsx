import React from "react";
import BannerItem from "./BannerItem";
import style from "./style.scss";
import classnames from "classnames/bind";
import { Component } from "react";
import propTypes from "prop-types";
import BScroll from "better-scroll";

const cx = classnames.bind(style);

class Banner extends Component {
  static props = {
    loop: propTypes.bool,
    autoPlay: propTypes.bool,
    interval: propTypes.number,
    showDot: propTypes.bool,
    click: propTypes.bool
  };
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000,
    showDot: true,
    click: true
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      dots: [],
      currentPageIndex: 0
    };
  }

  render() {
    return (
      <div ref="slider" className={style.slider}>
        <div ref="sliderGroup" className={style.sliderGroup}>
          {this.props.children}
        </div>
        <div className={style.dots}>
          {this.state.dots.map((dot, index) => (
            <span
              key={index}
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
  componentDidMount() {
    setTimeout(() => {
      this.setSliderWidth();
      if (this.props.showDot) {
        this.initDots();
      }
      this.initSlider();
      if (this.props.autoPlay) {
        this.play();
      }
    }, 20);
  }
  setSliderWidth(isResize) {
    this.children = this.refs.sliderGroup.children;
    let width = 0;
    let sliderWidth = this.refs.slider.clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];

      child.style.width = sliderWidth + "px";
      width += sliderWidth;
    }
    if (this.props.loop && !isResize) {
      width += 2 * sliderWidth;
    }
    this.refs.sliderGroup.style.width = width + "px";
  }
  initSlider() {
    this.slider = new BScroll(this.refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: 0.3,
        speed: 400
      },
      click: this.props.click
    });

    this.slider.on("beforeScrollStart", () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer);
      }
    });

    this.slider.on("scrollEnd", this.onScrollEnd.bind(this));
  }
  onScrollEnd() {
    let pageIndex = this.slider.getCurrentPage().pageX;
    if (this.props.loop) {
      pageIndex -= 1;
    }
    this.setState({
      currentPageIndex: pageIndex
    });
    if (this.props.autoPlay) {
      this.play();
    }
  }
  play() {
    let pageIndex = this.slider.getCurrentPage().pageX + 1;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.slider.goToPage(pageIndex, 0, 400);
    }, this.props.interval);
  }
  initDots() {
    const arr = [];
    for (var index = 0; index < this.children.length; index++) {
      arr.push(1);
    }
    this.setState({
      dots: arr
    });
  }
}

export { Banner, BannerItem };
export default Banner;
