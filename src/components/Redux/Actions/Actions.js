import { get } from '../../Api/Api';

const getAdRequest = () => ({
    type: 'GET_AD_REQUEST',
});

const getAdSuccess = (data) => ({
    type: 'GET_AD_SUCCESS',
    payload: data,
});

const getAdFailure = (error) => ({
    type: 'GET_AD_FAILURE',
    payload: error,
});

export const getAdData = (id) => {
    return async (dispatch) => {
        dispatch(getAdRequest());
        try {
            const response = await get(`ads/${id}`);
            dispatch(getAdSuccess(response.data));
        } catch (error) {
            dispatch(getAdFailure(error.message));
        }
    };
};

