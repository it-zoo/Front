import {Component} from 'react'
import React from 'react'
import {HistoryList} from "../../Components/HistoryList/HistoryList";
import * as HistoryActions from '../../Store/HistoryPart/actions'
import * as AuthActions from '../../Store/Auth/actions'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class HistoryContainer extends Component {

    async componentDidMount() {
        console.log("Auth state", this.props.authState);
        await this.props.authActions.getCurrentUser();
        this.props.historyActions.fetchedHistory(this.props.authState.currentUser.id)
    }

    render() {
        //items={this.props.historyState.routes}
        return (
            <HistoryList items={this.props.historyState.routes}/>
        )
    }
}

function mapToStore(state) {
    return {
        historyState: state.HI_historyState,
        authState: state.AU_authState,
    }
}

function mapDispatches(dispatch) {
    return {
        historyActions: bindActionCreators(HistoryActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapToStore, mapDispatches)(HistoryContainer)