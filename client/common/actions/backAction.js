export default function (dispatch, getState) {
    if (history.length > 0) {
        history.back();
    } else {
        window.location.hash = 'main'
    }
}
