import React from 'react';
import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

import './pagination.styl';

const NotePagination = React.createClass({
    openPage(page) {
        this.props.store.dispatch({
            type: 'updateFilter',
            page: page
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        const pages = [];
        for (let i = 1; i <= this.props.data.notes.totalPages; i++) {
            pages.push(i);
        }
        const current = this.props.data.notes.filters.page;
        return <ul className="pagination">
            {pages.map((index) =>
                <li key={index} className={index === current ? 'active' : ''} onClick={this.openPage.bind(this, index)}>
                    {index}
                </li>)
            }
        </ul>;
    }
});

export default withStore(NotePagination);
