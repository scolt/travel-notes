export default function (state, action) {

    if (action.type === 'endProcessing' && action.reqData.model === 'notes') {
        if (action.reqData.type === 'prepareGallery') {
            let {images} = state;
            images = [];
            action.resData.result.forEach(item => images = images.concat(item.photos));
            images = images.map(item => ({src: item}));
            return {...state, images};
        }
    }

    return false;
}
