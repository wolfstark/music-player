import React from "react";
import propTypes from "prop-types";
import { Banner, BannerItem } from "../../components/Banner";
import style from "./style.scss";

const RecommendBanner = props => {
  return (
    <div className={style.bannerWrapper}>
      {props.data.length ? (
        <Banner>
          {props.data.map((slider, index) => (
            <BannerItem key={index}>
              <a className={style.linkUrl} href={slider.linkUrl}>
                <img className={style.picUrl} alt="" src={slider.picUrl} />
              </a>
            </BannerItem>
          ))}
        </Banner>
      ) : (
        <div>{/* 加载中... */}</div>
      )}
    </div>
  );
};
RecommendBanner.props = {
  data: propTypes.array.isRequired
};
export default RecommendBanner;
