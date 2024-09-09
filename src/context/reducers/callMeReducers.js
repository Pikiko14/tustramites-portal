export function call_reducers(state, action) {
    switch (action.type) {
        case 'CALL_ME':
            return { ...state, call_me: action.payload }
        case 'CHAT_ME':
            return { ...state, chat_me: action.payload }
        case 'CALL_US':
            return { ...state, call_us: action.payload }
        default:
            return state
    }
}