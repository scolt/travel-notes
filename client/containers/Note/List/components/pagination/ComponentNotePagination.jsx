import React from 'react';
import withStore from '../../../../../common/components/withStore/withStore';

import './pagination.styl';

const NotePagination = React.createClass({

    openPage(page) {
        this.props.store.dispatch({
            type: 'updateFilter',
            page: page
        });
        this.props.onChange();
    },

    render() {
        const pages = [];
        for (let i = 1; i <= this.props.data.notes.totalPages; i++) {
            pages.push(i);
        }
        const current = this.props.data.notes.filters.page;
        return <div>
            {pages.length > 1 ? <ul className="pagination">
                {pages.map((index) =>
                    <li key={index} className={index === current ? 'active' : ''} onTouchTap={this.openPage.bind(this, index)}>
                        {index}
                    </li>)
                }
            </ul> : null}
        </div>;
    }
});

export default withStore(NotePagination);
