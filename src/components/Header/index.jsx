import React from "react";
import { Link } from "react-router-dom";
import style from "./style.scss";
import classNames from "classnames";

export const Header = props => {
  return (
    <div className={style.header}>
      <div className={style.icon} />
      <h1 className={style.text}>Chicken Music</h1>
      <Link className={style.mine} to="/user">
        <i className={classNames("icon-mine", style.iconMine)} />
      </Link>
    </div>
  );
};

export default Header;
