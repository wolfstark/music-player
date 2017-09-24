import React from "react";
import PropTypes from "prop-types";
import { Banner, BannerItem } from "../../components/Banner";
import style from "./style.scss";
import { Component } from "react";

class RecommendBanner extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className={style.bannerWrapper}>
        {this.props.data.length ? (
          <Banner>
            {this.props.data.map((slider, index) => (
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
  }
}

export default RecommendBanner;
