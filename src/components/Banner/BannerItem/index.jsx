import React from "react";
import style from "./style.scss";

const BannerItem = props => {
  return <div className={style.sliderItem}>{props.children}</div>;
};

export default BannerItem;
