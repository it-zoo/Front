import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';
import Form from '../Form';

import * as UserCredentialsActions from '../../Store/UserCredentials/actions';

import './style.scss';
import {Link, Redirect} from "react-router-dom";
import SocialSignup from "../../Components/SocialSignUp/SocialSignUp";

class RegistrationPageContainer extends Component {
    render = () => {
        console.log("Render signup");
        if (this.props.isAuthenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }
        const {fields} = this.props.store;
        return (
            <div className="registration_page_container">
                <div className="block_actions">
                    <div className="header">Регистрация в Stopy-singer</div>
                    <SocialSignup/>
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <Form ActionsEntry={this.props.userCredActions.ActionOfChangeStateCredentials} fields={fields}
                          button={this.props.store.button_send}/>
                    <div className="link">
                        <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStore(state) {
    return {
        store: state.RPI_registrationPageState,
        isAuthenticated: state.AU_authState.isAuthenticated
    }
}

function mapDispatches(dispatch) {
    return {
        userCredActions: bindActionCreators(UserCredentialsActions, dispatch)
    }
}

export default connect(mapStore, mapDispatches)(RegistrationPageContainer)

