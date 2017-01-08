import React from 'react';
import Dropzone from 'react-dropzone';
import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

const AddImageButton = React.createClass({
    onDrop(files) {
        this.props.store.dispatch({
            type: 'onAdditionalImageSet',
            name: 'file',
            value: files[0]
        });
    },
    uploadImage(e) {
        e.stopPropagation();
        this.props.store.dispatch({
            type: 'preparePayloadForAdditionalImage'
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            action: 'addImage',
            type: 'addImage'
        }));
    },

    render() {
        const addImageFormField = this.props.data.notes.addImageForm.fields[0];
        return <Dropzone onDrop={this.onDrop}
                         className="col-33-custom gallery-item drop-zone"
                         activeClassName="active"
                         accept="image/*">
            <div className="drop-zone-sq">
                <strong>Add New Image</strong>
                {addImageFormField.value ? <img src={addImageFormField.value.preview}/> : null}
                {addImageFormField.value ? <div className="submit-drop" onClick={this.uploadImage}>Upload</div> : null}
            </div>
        </Dropzone>;
    }
});

export default withStore(AddImageButton);
