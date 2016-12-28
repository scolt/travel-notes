import React from 'react';
import Icon from 'react-fa';
import {TextField, RaisedButton, Card, CardActions, CardTitle, CardText } from 'material-ui';
import makeFormMixin from 'services/formMakerMixin';
import {loginUser} from 'actions/users';
import storeMixin from 'mixins/storeMixin';
import restApi from 'actions/restApi';

const loginView = React.createClass({
    formName: 'loginForm',

    mixins: [storeMixin],

    login() {
        this.store.dispatch({type: 'preparePayloadForUserLogin'});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'login',
            type: 'login'
        }));
    },

    onChange(e) {
        const {formName} = this;
        const {name, value} = e.target;
        this.store.dispatch({type: 'onChangeFormField', name, value, formName});
    },

    render() {
        const {net} = this.state;
        const editForm = this.state.users[this.formName];
        const inputStyle = {
            width: '100%'
        };
        const form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Login" subtitle="Enter your email and password" />
                    <CardText>
                        {editForm.fields.map((field, i) => {
                            return (<div key={i}>
                                <TextField
                                    name={field.name}
                                    style={inputStyle}
                                    disabled={field.readOnly}
                                    type={field.type}
                                    hintText={field.hintText}
                                    errorText={field.errorText}
                                    defaultValue={field.defaultValue}
                                    onChange={this.onChange}/><br/></div>);
                        })
                        }
                    </CardText>
                    <CardActions>
                        {editForm.buttons.map((button, i) =>
                            <RaisedButton
                                key={i}
                                name={button.name}
                                label={button.label}
                                disabled={!editForm.isValid}
                                primary={true}
                                onTouchTap={this.login.bind(this, button.name)}/>
                        )}
                    </CardActions>
                </Card>

            </div>;
        return (
            <div>
                {net.isProcessing ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : form }
            </div>
        );
    }
});

export default loginView;
