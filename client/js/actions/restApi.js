import request from 'superagent';
import config from '../config/config';

function restApi({model, ext = 'json', action = 'read', id = '', type} = {}) {
    return (dispatch, getState) => {
        const payload = getState()[model].payload;
        dispatch({type: 'startProcessing'});
        return request
            .post(`${config.restURL}/restApi/${model}.${ext}/${action}/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${window.sessionStorage.token}`)
            .send(payload)
            .end((err, res) => {
                dispatch({type: 'endProcessing', data: {model, ext, action, id, type, data: res.body}});
                dispatch(err ?
                    {type: 'errProcessing', err, data: {model, action, type}} :
                    {type, data: res.body}
                );
            });
    };
}

export default restApi;
