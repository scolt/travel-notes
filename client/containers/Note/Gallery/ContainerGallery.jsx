import React from 'react';

import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';
import Gallery from 'common/components/gallery/Gallery';

import MyFilter from '../List/components/onlyMyFilter/ComponentOnlyMyFilter';
import Pagination from '../List/components/pagination/ComponentNotePagination';

const GalleryPage = React.createClass({
    loadImages() {
        this.props.store.dispatch({
            type: 'updateFilter',
            fields: ['photos']
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'prepareGallery'
        }));
    },

    componentWillunmount() {
        this.props.store.dispatch({
            type: 'resetNoteFilterPayload'
        });
    },

    componentWillMount() {
        this.loadImages();
    },

    render() {
        return <div>
            <MyFilter onChange={this.loadImages}/>
            <Gallery
                images={this.props.data.notes.images}
                noSpaces={true}
            />
            <Pagination onChange={this.loadImages} />
        </div>;
    }
});

export default withStore(GalleryPage);
