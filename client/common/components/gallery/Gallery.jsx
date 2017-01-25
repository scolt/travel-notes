import React from 'react';
import Lightbox from 'react-images';
import './styl/gallery.styl';
const Gallery = React.createClass({
    getInitialState() {
        return {
            lightboxIsOpen: false,
            currentImage: 0
        };
    },

    openLightbox (index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    },

    closeLightbox () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    },

    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    },

    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    },

    render() {
        const noSpace = this.props.noSpaces;
        return <div className={`gallery-row ${noSpace ? 'no-space' : '' }`}>
            {this.props.images.map((tile, index) => (
                tile.src &&
                    <div
                        key={index}
                        title={tile.title}
                        className="col-33-custom"
                        onTouchTap={(e) => { this.openLightbox(index, e); } }>
                        <div className="gallery-item">
                            <img src={tile.src} />
                        </div>
                    </div>
            ))}

            {this.props.appendAfter}

            <Lightbox
                images={this.props.images}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
                onClickImage={this.handleClickImage}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                onClose={this.closeLightbox}
                showThumbnails={this.props.showThumbnails}
                theme={this.props.theme}
            />
        </div>;
    }
});

export default Gallery;
