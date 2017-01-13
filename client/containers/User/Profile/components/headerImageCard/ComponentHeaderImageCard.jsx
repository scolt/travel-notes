import React from 'react';
import Dropzone from 'react-dropzone';

import withStore from 'common/components/withStore/withStore';
import 'user-bg.jpg';

const HeaderCard = React.createClass({
    getFormFieldByName(name) {
        return this.props.data.users.registerForm.fields.filter((item) => {
            return item.name === name;
        }).pop();
    },

    onDrop(files, name) {
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'users',
            formName: 'registerForm',
            name: name,
            value: files[0]
        });
    },

    render() {
        const bg = this.getFormFieldByName('background');
        const avatar = this.getFormFieldByName('avatar');
        const profile = this.props.data.users.profile;
        const isEditMode = this.props.data.users.editMode;

        return <div>
            <Dropzone onDrop={files => this.onDrop(files, 'background')}
                      disableClick={!isEditMode}
                      className="drop-zone"
                      activeClassName="active"
                      accept="image/*">
                <div className="user-bg" style={{backgroundImage: `url(${bg.value.preview || profile.background || 'images/user-bg.jpg'})`}} alt=""/>
            </Dropzone>
            <Dropzone onDrop={files => this.onDrop(files, 'avatar')}
                      disableClick={!isEditMode}
                      className="drop-zone"
                      activeClassName="active"
                      accept="image/*">
                <div className="avatar">
                    <img src={avatar.value.preview || profile.avatar || 'images/avatar.jpg'} alt="User Avatara"/>
                </div>
            </Dropzone>
        </div>;
    }
});

export default withStore(HeaderCard);
