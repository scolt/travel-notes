import React from 'react';

import restApi from '../../../common/actions/restApi';
import withStore from '../../../common/components/withStore/withStore';

import HeaderCard from './components/headerCard/ComponentHeaderCard';
import DetailsCard from './components/detailsCard/ComponentDetailsCard';
import ContactsCard from './components/contactsCard/ComponentContactsCard';
import UserNotes from './components/userNotes/ComponentUserNotes';
import './styl/profile.styl';

const Profile = React.createClass({

    componentWillMount() {
        this.props.store.dispatch(restApi({
            model: 'users',
            id: this.props.params.id,
            type: 'prepareProfile'
        }));
    },

    render() {
        const isEditMode = this.props.data.users.editMode;
        return <div className={`profile row ${isEditMode ? 'edit-mode-active' : ''}`}>
            <div className="header-profile">
                <HeaderCard />
                <div className="user-detailed-blocks">
                    <div className="row">
                        <div className="col-md-6 col-xs-12 item">
                            <DetailsCard />
                        </div>
                        <div className="col-md-6 col-xs-12 item">
                            <ContactsCard />
                        </div>
                    </div>
                </div>
                <div className="user-detailed-blocks">
                    <UserNotes userId={this.props.params.id}/>
                </div>
            </div>
        </div>;
    }
});

export default withStore(Profile);
