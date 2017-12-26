// @ts-check
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as playersActions from '../../actions/player';
import { playMode } from '../../common/js/config';
import { shuffle } from '../../common/js/util';

/**
 * 为Component注入playlist,并在list变更时执行handlePlaylist钩子
 * @returns {Component}
 * @param {Component} WrappedComponent
 */
export const playlistHOC = WrappedComponent =>
  class extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    constructor(props, context) {
      super(props, context);
      this.state = {
        playlist: []
      };
    }
    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => this.updateHook());
      this.updateHook();
    }
    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }
    updateHook() {
      const { store } = this.context;
      const playlist = store.getState().player.playlist;
      this.setState({ playlist });
      this.refs.WrappedComponent.handlePlaylist(playlist);
    }
    render() {
      return (
        <WrappedComponent
          ref="WrappedComponent"
          playlist={this.state.playlist}
          {...this.props}
        />
      );
    }
  };
/**
 * 为Component注入播放器所需的数据和方法
 * @param {Component} WrappedComponent
 * @returns {Component}
 */
export const playerHOC = WrappedComponent =>
  class extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    constructor(props, context) {
      super(props, context);
      this.state = {
        sequenceList: [],
        playlist: [],
        currentSong: {},
        mode: "",
        favoriteList: []
      };
      const { dispatch } = this.context.store;
      const playersActionBind = bindActionCreators(playersActions, dispatch);

      this.setCurrentIndex = playersActionBind.setCurrentIndex;
      this.setPlayMode = playersActionBind.setPlayMode;
      this.setPlaylist = playersActionBind.setPlaylist;
      this.deleteFavoriteList = playersActionBind.deleteFavoriteList;
      this.saveFavoriteList = playersActionBind.saveFavoriteList;
    }
    componentDidMount() {
      const { store } = this.context;

      this.unsubscribe = store.subscribe(() => this.updateHook());
      this.updateHook();
    }
    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }
    updateHook() {
      const { getState } = this.context.store;
      const {
        playlist,
        sequenceList,
        currentIndex,
        mode,
        favoriteList
      } = getState().player;
      this.setState({
        playlist,
        sequenceList,
        mode,
        favoriteList,
        currentSong: playlist[currentIndex]
      });
    }
    isFavorite(song) {
      const index = this.state.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    }
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.state.currentSong.id;
      });
      this.setCurrentIndex(index);
    }
    changeMode() {
      const mode = (this.state.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.state.sequenceList);
      } else {
        list = this.state.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    }
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    }
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return "icon-favorite";
      }
      return "icon-not-favorite";
    }
    iconMode() {
      return this.state.mode === playMode.sequence
        ? "icon-sequence"
        : this.state.mode === playMode.loop ? "icon-loop" : "icon-random";
    }
    render() {
      return (
        <WrappedComponent
          ref="WrappedComponent"
          iconMode={this.iconMode.bind(this)}
          getFavoriteIcon={this.getFavoriteIcon.bind(this)}
          toggleFavorite={this.toggleFavorite.bind(this)}
          changeMode={this.changeMode.bind(this)}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
