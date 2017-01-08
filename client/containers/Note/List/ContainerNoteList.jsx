import React from 'react';
import Icon from 'react-fa';

import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';
import NoteGrid from './components/noteGrid/ComponentNoteGrid';
import NotePagination from './components/pagination/ComponentNotePagination';
import NoteOrderFilter from './components/orderFilter/ComponentOrderFilter';
import NoteOnlyMyFilter from './components/onlyMyFilter/ComponentOnlyMyFilter';
import AddNewNoteButton from './components/addNewOne/ComponentAddNewOne';

const NoteList = React.createClass({
    reloadPage() {
        this.props.store.dispatch({
            type: 'resetNoteFilterPayload'
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    componentWillMount() {
        this.reloadPage();
    },

    render() {
        const isLoading = this.props.data.notes.isProcessing;
        const card = <div>
            <NoteOrderFilter />
            <NoteOnlyMyFilter />
            <NoteGrid
                reloadList={this.reloadPage}
                appendBefore={<AddNewNoteButton/>}
            />
            <NotePagination />
        </div>;

        return <div>
            <div className="spinner" style={{display: isLoading ? 'block' : 'none'}}><Icon name="circle-o-notch" spin/></div>
            <div style={{display: isLoading ? 'none' : 'block'}}>{card}</div>
        </div>;
    }
});

export default withStore(NoteList);
