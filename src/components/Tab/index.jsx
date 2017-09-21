import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.scss";

const Tab = props => {
  return (
    <div className={style.tab}>
      <NavLink
        className={style.tabItem}
        activeClassName={style.tabItemActive}
        to="/recommend"
      >
        <span className={style.tabLink}>推荐</span>
      </NavLink>
      <NavLink
        className={style.tabItem}
        activeClassName={style.tabItemActive}
        to="/singer"
      >
        <span className={style.tabLink}>歌手</span>
      </NavLink>
      <NavLink
        className={style.tabItem}
        activeClassName={style.tabItemActive}
        to="/rank"
      >
        <span className={style.tabLink}>排行</span>
      </NavLink>
      <NavLink
        className={style.tabItem}
        activeClassName={style.tabItemActive}
        to="/search"
      >
        <span className={style.tabLink}>搜索</span>
      </NavLink>
    </div>
  );
};

export default Tab;
