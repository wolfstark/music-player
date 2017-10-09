import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./style.scss";
import LazyLoad from "react-lazyload";
import Loading from "../Loading";
import Placeholder from "../Placeholder";

class RecommendList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    clickItemHandle: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <h1 className={style.listTitle}>热门歌单推荐</h1>
        {this.props.data.length ? (
          <ul className={style.listWrapper}>
            {this.props.data.map((item, index) => (
              <li
                key={index}
                onClick={this.clickHandle.bind(this, item.dissid)}
                className={style.item}
              >
                <div className={style.icon}>
                  <LazyLoad
                    once={true}
                    placeholder={<Placeholder height="1.2rem" />}
                  >
                    <img src={item.imgurl} alt="" className={style.coverImg} />
                  </LazyLoad>
                </div>
                <div className={style.text}>
                  <h2 className={style.name}>{item.creator.name}</h2>
                  <p className={style.desc}>{item.dissname}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
  clickHandle(id) {
    this.props.clickItemHandle(id);
  }
}

export default RecommendList;
