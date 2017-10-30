import * as actionTypes from '../constants/player'

const initialState = {}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_INDEX:
            return action.payload
        default:
            return state
    }
}