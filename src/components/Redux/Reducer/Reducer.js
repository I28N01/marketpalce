const initialState = {
    adData: null,
    loading: false,
    error: null,
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_AD_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_AD_SUCCESS':
            return {
                ...state,
                loading: false,
                adData: action.payload,
            };
        case 'GET_AD_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default adReducer;
