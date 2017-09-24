import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./style.scss";

class Loading extends PureComponent {
  static propTypes = {
    title: PropTypes.string
  };
  static defaultProps = {
    title: "正在载入..."
  };

  render() {
    return (
      <div className={style.loading}>
        <i className={style.weuiLoading} />
        <p className={style.desc}>{this.props.title}</p>
      </div>
    );
  }
}

export default Loading;
