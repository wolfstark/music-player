import React, { PureComponent } from "react";
import style from "./style.scss";
import PropTypes from "prop-types";

class Placeholder extends PureComponent {
  static propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string,
    img: PropTypes.string
  };
  static defaultProps = {
    img: require("../../common/image/default.png")
  };
  render() {
    return (
      <div className={style.placeholder}
        style={{
          backgroundImage: `url(${this.props.img})`,
          height: this.props.height,
          width: this.props.width
        }}
      />
    );
  }
}

export default Placeholder;
