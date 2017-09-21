import React from "react";
import propTypes from "prop-types";
import { Banner, BannerItem } from "../../components/Banner";
import style from "./style.scss";

const RecommendBanner = props => {
  return (
    <Banner>
      {props.data.map((slider, index) => (
        <BannerItem key={index}>
          <a className={style.linkUrl} href={slider.linkUrl}>
            <img className={style.picUrl} alt="" src={slider.picUrl} />
          </a>
        </BannerItem>
      ))}
    </Banner>
  );
};
RecommendBanner.props = {
  data: propTypes.array.isRequired
};
export default RecommendBanner;
