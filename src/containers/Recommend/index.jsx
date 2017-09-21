import { connect } from "react-redux";
import RecommendBanner from "../../components/RecommendBanner";
import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
// import { actionCreator } from "actionCreatorPath";
import React, { Component } from "react";

class Recommend extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recommends: []
    };
  }
  render() {
    return (
      <div>
        <RecommendBanner data={this.state.recommends} />
      </div>
    );
  }
  componentDidMount() {
    this.asyncData();
  }
  async getRecommendData() {
    const res = await getRecommend();
    if (res.code === ERR_OK) this.setState({ recommends: res.data.slider });
  }
  async asyncData() {
    this.getRecommendData();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // prop: state.prop
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch1: () => {
    //   dispatch(actionCreator);
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
