import React, { PureComponent } from "react";
import Loading from "../Loading";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import style from "./style.scss";
import Placeholder from "../Placeholder";
import { getData } from "../../common/js/dom";
import { ease } from "../../common/js/ease";
import { offset } from "../../common/js/dom";
import classnames from "classnames/bind";

const cx = classnames.bind(style);
class ListView extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.ANCHOR_HEIGHT = 18; //0.36rem
    this.TITLE_HEIGHT = 30; //0.3rem
    this.probeType = 3;
    this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
    this.state = {
      shortcutList: [],
      fixedTitle: "",
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ shortcutList: this.getShortcutList(nextProps.data) });
      setTimeout(() => this._calculateHeight(), 0);
    }
  }
  _calculateHeight() {
    this.listHeight = [];
    const list = this.refs.listGroup.children;
    let height = 0;
    this.listHeight.push(height);
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }
  getFixedTitle() {
    if (this.state.scrollY > 0) {
      return "";
    }
    return this.data[this.state.currentIndex]
      ? this.data[this.state.currentIndex].title
      : "";
  }
  getShortcutList(data) {
    return data.map(group => {
      return group.title.substr(0, 1);
    });
  }
  onShortcutTouchStart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    let anchorIndex = getData(event.target, "index");
    let firstTouch = event.touches[0];
    this.touch.y1 = firstTouch.pageY;
    this.touch.anchorIndex = anchorIndex;
    // console.log(this.touch);
    this._scrollTo(anchorIndex);
  }
  onShortcutTouchMove(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    let firstTouch = event.touches[0];
    this.touch.y2 = firstTouch.pageY;
    let delta = ((this.touch.y2 - this.touch.y1) / this.ANCHOR_HEIGHT) | 0;
    let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
    console.log(this.touch);

    // this._scrollTo(anchorIndex);
  }
  _scrollTo(index) {
    if (index < 0) {
      index = 0;
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2;
    }
    this.setState({ scrollY: -this.listHeight[index] });
    this.scrollToElement(this.refs.listGroup.children[index], 0);
  }
  scrollToElement(el, time) {
    let pos = offset(el);
    pos.left -= this.wrapperOffset.left;
    pos.top -= this.wrapperOffset.top;

    pos.left =
      pos.left > 0
        ? 0
        : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
    pos.top =
      pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

    if (this.options.wheel) {
      pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
    }

    this.scrollTo(pos.left, pos.top, time);
  }
  scrollTo(x, y, time = 0, easing = ease.bounce) {
    this.isInTransition = false;

    if (!time || this.options.useTransition) {
      this._transitionTimingFunction(easing.style);
      this._transitionTime(time);
      this._translate(x, y);

      if (time && this.options.probeType === 3) {
        this._startProbe();
      }

      if (this.options.wheel) {
        if (y > 0) {
          this.selectedIndex = 0;
        } else if (y < this.maxScrollY) {
          this.selectedIndex = this.items.length - 1;
        } else {
          this.selectedIndex = Math.abs(y / this.itemHeight) | 0;
        }
      }
    } else {
      this._animate(x, y, time, easing.fn);
    }
  }
  render() {
    return (
      <div className={style.listview}>
        <ul ref="listGroup">
          {this.props.data.map((group, index) => (
            <li key={index} className={style.listGroup}>
              <h2 className={style.listGroupTitle}>{group.title}</h2>
              <ul>
                {group.items.map((item, index) => (
                  <li key={index} className={style.listGroupItem}>
                    <LazyLoad
                      once={true}
                      placeholder={<Placeholder height="1rem" width="1rem" />}
                    >
                      <img className={style.avatar} alt="" src={item.avatar} />
                    </LazyLoad>
                    <span className={style.name}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div
          className={style.listShortcut}
          onTouchStart={this.onShortcutTouchStart.bind(this)}
          onTouchMove={this.onShortcutTouchMove.bind(this)}
        >
          <ul>
            {this.state.shortcutList.map((item, index) => (
              <li
                key={index}
                className={cx({
                  item: true,
                  itemCurrent: this.state.currentIndex === index
                })}
                data-index={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.listFixed} ref="fixed" v-show="fixedTitle">
          <div className={style.fixedTitle}>{this.state.fixedTitle} </div>
        </div>
        <div v-show="!data.length" className={style.loadingContainer}>
          <Loading />
        </div>
      </div>
    );
  }
}

export default ListView;
