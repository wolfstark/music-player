import React, { PureComponent } from "react";
import Loading from "../Loading";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import style from "./style.scss";
import Placeholder from "../Placeholder";
import { getData } from "../../common/js/dom";
import classnames from "classnames/bind";

const cx = classnames.bind(style);
class ListView extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  constructor(props, context) {
    super(props, context);
    const SIZE = getComputedStyle(document.documentElement).fontSize.slice(
      0,
      -2
    );
    const me = this;

    this.ANCHOR_HEIGHT = 0.36 * SIZE; //0.36rem
    this.TITLE_HEIGHT = 0.6 * SIZE; //0.3rem
    // this.probeType = 3;
    // this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
    let _diff = -1;
    let _scrollY = 0;
    Object.defineProperty(this, "scrollY", {
      get() {
        return _scrollY;
      },
      set(val) {
        _scrollY = val;
        me.scrollYObserver(_scrollY);
      }
    });
    Object.defineProperty(this, "diff", {
      get() {
        return _diff;
      },
      set(val) {
        _diff = val;
        me.diffObserver(_diff);
      }
    });
    this.state = {
      shortcutList: [],
      currentIndex: 0
    };
  }
  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.currentIndex !== this.state.currentIndex) {
  //     this.getFixedTitle();
  //   }
  // }
  componentDidMount() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ shortcutList: this.getShortcutList(nextProps.data) });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate() {
    this._calculateHeight();
    this.ticking = false;
  }
  render() {
    return (
      <div className={style.listview}>
        {this.props.data.length ? (
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
                        <img
                          className={style.avatar}
                          alt=""
                          src={item.avatar}
                        />
                      </LazyLoad>
                      <span className={style.name}>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.loadingContainer}>
            <Loading />
          </div>
        )}
        <ul
          className={style.listShortcut}
          onTouchStart={this.onShortcutTouchStart.bind(this)}
          onTouchMove={this.onShortcutTouchMove.bind(this)}
        >
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
        <div
          className={cx({
            listFixed: true,
            listFixedHide: !this.getFixedTitle()
          })}
          ref="fixed"
        >
          <div className={style.fixedTitle}>{this.getFixedTitle()} </div>
        </div>
      </div>
    );
  }
  scrollYObserver(newY) {
    const listHeight = this.listHeight;
    if (newY <= 0) newY = 1;

    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
      if (newY >= height1 && newY < height2) {
        //, diff: height2 - newY
        if (this.state.currentIndex === i) {
          this.ticking = false; // 没必要更新
        } else {
          this.setState({ currentIndex: i });
        }
        this.diff = height2 - newY;
        return;
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    this.setState({ currentIndex: listHeight.length - 2 });
  }
  diffObserver(newVal) {
    const fixedTop =
      newVal > 0 && newVal < this.TITLE_HEIGHT ? newVal - this.TITLE_HEIGHT : 0;

    this.refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
  }
  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.scrollY = window.scrollY;
      });
    }
    this.ticking = true;
  }
  _calculateHeight() {
    this.listHeight = [];
    const list = (this.refs.listGroup && this.refs.listGroup.children) || [];
    let height = 0;
    this.listHeight.push(height);
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }
  getFixedTitle() {
    if (this.scrollY < 0) {
      return "";
    }
    return this.props.data[this.state.currentIndex]
      ? this.props.data[this.state.currentIndex].title
      : "";
  }
  getShortcutList(data) {
    return data.map(group => {
      return group.title.substr(0, 1);
    });
  }
  onShortcutTouchStart(event: TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    const anchorIndex = parseInt(getData(event.target, "index"), 10);
    const firstTouch = event.touches[0];
    this.touch.y1 = firstTouch.clientY;
    this.touch.anchorIndex = anchorIndex;
    // console.log(this.touch);
    this._scrollTo(anchorIndex);
  }
  onShortcutTouchMove(event: TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    const firstTouch = event.touches[0];
    this.touch.y2 = firstTouch.clientY;
    if (
      this.touch.y2 < 0 ||
      this.touch.y2 > document.documentElement.clientHeight
    )
      return; // FIXME: safari连续触发事件时有可能返回一个负数或者远超屏幕的最大值
    const delta = ((this.touch.y2 - this.touch.y1) / this.ANCHOR_HEIGHT) | 0;
    const anchorIndex = this.touch.anchorIndex + delta;

    if (this.state.currentIndex !== anchorIndex) this._scrollTo(anchorIndex);
  }
  _scrollTo(index: Number) {
    if (index < 0) {
      index = 0;
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2;
    }
    // this.scrollY = this.listHeight[index];
    document.documentElement.scrollTop = this.listHeight[index];
    document.body.scrollTop = this.listHeight[index];
  }
}

export default ListView;
