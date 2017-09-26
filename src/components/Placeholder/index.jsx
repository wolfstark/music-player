import React, { PureComponent } from "react";
import style from "./style.scss";

class Placeholder extends PureComponent {
  render() {
    return <div className={style.weuiLoading} />;
  }
}

export default Placeholder;
