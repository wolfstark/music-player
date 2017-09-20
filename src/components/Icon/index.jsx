import React from "react";
import style from "./style.scss";

const Component = props => {
  return <i className={style['icon-mine']}>{props.children}</i>;
};

export { Component };
