import axiosInstance from "../axiosConfig";
export const LONGRENT_INQUERY_REQUEST = "LONGRENT_INQUERY_REQUEST";
export const LONGRENT_INQUERY_SUCCESS = "LONGRENT_INQUERY_SUCCESS";
export const LONGRENT_INQUERY_FAILURE = "LONGRENT_INQUERY_FAILURE";

export const longrentInqueryRequest = () => ({
    type: LONGRENT_INQUERY_REQUEST,
});

export const longrentInquerySuccess = (data) => ({
    type: LONGRENT_INQUERY_SUCCESS,
    payload: data,
});


export const longrentInqueryFailure = (error) => ({
    type: LONGRENT_INQUERY_FAILURE,
    payload: error,
});


export const getLongrentInquery = () => {
    return(dispatch)=>{
        dispatch(longrentInqueryRequest());
        axiosInstance.get('/api/longrental-inquery/all')
        .then(response => {
            dispatch(longrentInquerySuccess(response.data));
        })
        .catch(error => {
            dispatch(longrentInqueryFailure(error.message));
        });
    }
}