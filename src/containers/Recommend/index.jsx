import { connect } from "react-redux";
import RecommendBanner from "../../components/RecommendBanner";
import RecommendList from "../../components/RecommendList";
import { getRecommend, getDiscList } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
// import { actionCreator } from "actionCreatorPath";
import React, { Component } from "react";

class Recommend extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recommends: [],
      discList: []
    };
  }
  render() {
    return (
      <div>
        <RecommendBanner data={this.state.recommends} />
        <RecommendList
          clickItemHandle={this.clickItemHandle.bind(this)}
          data={this.state.discList}
        />
      </div>
    );
  }
  componentDidMount() {
    this.asyncData();
  }
  async getRecommendBanner() {
    const res = await getRecommend();
    if (res.code === ERR_OK) this.setState({ recommends: res.data.slider });
  }
  async getRecommendList() {
    const res = await getDiscList();
    if (res.code === ERR_OK) this.setState({ discList: res.data.list });
  }
  async asyncData() {
    this.getRecommendBanner();
    this.getRecommendList();
  }
  clickItemHandle(id) {
    this.props.history.push(`/recommend/${id}`);
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
