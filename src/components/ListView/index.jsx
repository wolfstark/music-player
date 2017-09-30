import React, { PureComponent } from "react";
import Loading from "../Loading";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import style from "./style.scss";

class ListView extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    shortcutList: PropTypes.array.isRequired,
    fixedTitle: PropTypes.string
  };
  static defaultProps = {
    fixedTitle: ""
  };
  render() {
    return (
      <div className={style.listview}>
        <ul>
          {this.props.data.map((group, index) => (
            <li key={index} className={style.listGroup} ref="listGroup">
              <h2 className={style.listGroupTitle}>{group.title}</h2>
              <ul>
                {group.items.map((item, index) => (
                  <li key={index} className={style.listGroupItem}>
                    <LazyLoad once={true}>
                      <img className={style.avatar} alt="" src={item.avatar} />
                    </LazyLoad>
                    <span className={style.name}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className={style.listShortcut}>
          <ul>
            {this.props.shortcutList.map((item, index) => (
              <li key={index} className={style.item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.listFixed} ref="fixed" v-show="fixedTitle">
          <div className={style.fixedTitle}>{this.props.fixedTitle} </div>
        </div>
        <div v-show="!data.length" className={style.loadingContainer}>
          <Loading />
        </div>
      </div>
    );
  }
}

export default ListView;
