import React from 'react';
import Markdown from 'react-markdown';
import {Card, CardTitle, CardText} from 'material-ui';

import Map from 'common/components/map/Map';
import EditableInput from 'common/components/editableInput/ComponentEditableInput';
import withStore from 'common/components/withStore/withStore';

import HeaderAction from '../noteHeaderActions/ComponentNoteActions';

const styles = {
    headerTitle: {
        color: '#fff'
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.54)'
    }
};

const NoteEntity = React.createClass({
    propTypes: {
        bgPhoto: React.PropTypes.string,
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        isOwner: React.PropTypes.bool
    },

    onFieldChange(e) {
        const {name, value} = e.target;
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'notes',
            formName: 'noteForm',
            name,
            value
        });
    },

    getFormFieldByName(name) {
        return this.props.data.notes.noteForm.fields.filter((item) => {
            return item.name === name;
        }).pop();
    },

    changeCoordinate(marker) {
        const isEditMode = this.props.data.notes.editMode;
        isEditMode && this.onFieldChange({
            target: {
                name: 'position',
                value: {...marker}
            }
        });
    },

    render() {
        const note = this.props.data.notes.note;
        const titleField = this.getFormFieldByName('title');
        const subtitleField = this.getFormFieldByName('subtitle');
        const textField = this.getFormFieldByName('text');
        const isEditMode = this.props.data.notes.editMode;
        const position = isEditMode ? this.getFormFieldByName('position').value : note.position;

        return <div className={isEditMode ? 'row edit-enabled' : 'row'}>
            <div className="note-background">
                <img className="note-background-image" src={this.props.bgPhoto}/>
                <div className="col-sm-8 col-xs-12 note-container">
                    <Card style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                        <CardTitle
                            className="note-header"
                            subtitleStyle={styles.headerSubtitle}
                            titleStyle={styles.headerTitle}
                            title={<EditableInput field={titleField} editMode={isEditMode}
                                                  onChange={this.onFieldChange}>{this.props.title}</EditableInput>}
                            subtitle={<EditableInput field={subtitleField} editMode={isEditMode}
                                                     onChange={this.onFieldChange}>{this.props.subtitle}</EditableInput>}
                        >
                            {this.props.isOwner ? <HeaderAction isEditMode={isEditMode}/> : null}
                        </CardTitle>
                        <CardText style={{background: '#fff'}}>
                            <Map className="map-in-card"
                                 markers={[{position: position, title: note.title}]}
                                 center={note.position}
                                 canSetMarker={isEditMode ? this.changeCoordinate : false}
                                 canOpenMarker={false}/>
                            <div className="note-text">
                                <EditableInput field={textField}
                                               editMode={isEditMode}
                                               onChange={this.onFieldChange}>
                                    <Markdown source={note.text} />
                                </EditableInput>
                            </div>
                            {this.props.children}
                        </CardText>
                    </Card>
                </div>
            </div>
        </div>;
    }
});

export default withStore(NoteEntity);
