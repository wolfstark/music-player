// import { mapGetters, mapMutations, mapActions } from 'vuex';
import React, { Component } from "react";
// import { playMode } from "./config";
// import { shuffle } from "./util";
import PropTypes from "prop-types";

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

// export const playerMixin = {
//   computed: {
//     iconMode() {
//       return this.mode === playMode.sequence
//         ? "icon-sequence"
//         : this.mode === playMode.loop ? "icon-loop" : "icon-random";
//     },
//     ...mapGetters([
//       "sequenceList",
//       "playlist",
//       "currentSong",
//       "mode",
//       "favoriteList"
//     ])
//   },
//   methods: {
//     changeMode() {
//       const mode = (this.mode + 1) % 3;
//       this.setPlayMode(mode);
//       let list = null;
//       if (mode === playMode.random) {
//         list = shuffle(this.sequenceList);
//       } else {
//         list = this.sequenceList;
//       }
//       this.resetCurrentIndex(list);
//       this.setPlaylist(list);
//     },
//     resetCurrentIndex(list) {
//       let index = list.findIndex(item => {
//         return item.id === this.currentSong.id;
//       });
//       this.setCurrentIndex(index);
//     },
//     toggleFavorite(song) {
//       if (this.isFavorite(song)) {
//         this.deleteFavoriteList(song);
//       } else {
//         this.saveFavoriteList(song);
//       }
//     },
//     getFavoriteIcon(song) {
//       if (this.isFavorite(song)) {
//         return "icon-favorite";
//       }
//       return "icon-not-favorite";
//     },
//     isFavorite(song) {
//       const index = this.favoriteList.findIndex(item => {
//         return item.id === song.id;
//       });
//       return index > -1;
//     },
//     ...mapMutations({
//       setPlayMode: "SET_PLAY_MODE",
//       setPlaylist: "SET_PLAYLIST",
//       setCurrentIndex: "SET_CURRENT_INDEX",
//       setPlayingState: "SET_PLAYING_STATE"
//     }),
//     ...mapActions(["saveFavoriteList", "deleteFavoriteList"])
//   }
// };

// export const searchMixin = {
//   data() {
//     return {
//       query: "",
//       refreshDelay: 120
//     };
//   },
//   computed: {
//     ...mapGetters(["searchHistory"])
//   },
//   methods: {
//     onQueryChange(query) {
//       this.query = query;
//     },
//     blurInput() {
//       this.$refs.searchBox.blur();
//     },
//     addQuery(query) {
//       this.$refs.searchBox.setQuery(query);
//     },
//     saveSearch() {
//       this.saveSearchHistory(this.query);
//     },
//     ...mapActions(["saveSearchHistory", "deleteSearchHistory"])
//   }
// };
