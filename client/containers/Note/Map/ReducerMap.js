export default function (state, action) {
    if (action.type === 'endProcessing') {
        if (action.reqData.type === 'prepareMarkers') {
            return {...state, markers: action.resData.result.map(item =>
                ({
                    window: {
                        title: item.title,
                        link: `#/note/${item._id}`,
                        photo: item.photo
                    },
                    position: {
                        lng: parseFloat(item.lng),
                        lat:  parseFloat(item.lat)
                    }
                })
            )};
        }
    }

    return false;
}
