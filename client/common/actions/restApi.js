import request from 'superagent';
import config from '../config/config';

function restApi({model, ext = 'json', action = 'read', id = '', type} = {}) {
    return (dispatch, getState) => {
        const payload = getState()[model] && getState()[model].payload;

        dispatch({
            type: 'startProcessing',
            reqData: {model, ext, action, id, type}
        });

        return request
            .post(`${config.restURL}/restApi/${model}.${ext}/${action}/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', window.sessionStorage.token ? `Bearer ${window.sessionStorage.token}` : '')
            .send(payload)
            .end((err, res) => {
                if (res && res.headers['tn-user-type'] === 'expired') {
                    dispatch({
                        type: 'userSessionExpired'
                    });
                }

                const error = err || (res.body && res.body.err);

                const dataForDispatcher = error ? {
                    type: 'errProcessing',
                    reqData: {model, ext, action, id, type},
                    resData: error
                } : {
                    type: 'endProcessing',
                    reqData: {model, ext, action, id, type},
                    resData: res.body
                };

                dispatch(dataForDispatcher);
            });
    };
}

export default restApi;
