import React, {Component} from 'react';
import {connect} from 'react-redux';
import MapContainer from '../MapContainer';
import SearchPanel from "../../Components/SearchPanel/SearchPanel";
import Header from "../../Components/Header/Header";
import './style.scss'
import MapGoogle from '../GoogleMap';

import {bindActionCreators} from 'redux';
import * as PositionActions from '../../Store/UserPosition/actions';
import * as SendPosition from '../../Store/UserSocket/actions';
import {HistoryList} from "../../Components/HistoryList/HistoryList";
import HistoryContainer from "../HistoryContainer";

class MainPageContainer extends Component {
    constructor(props) {
        super(props);
        this.geolocation = navigator.geolocation;
    }

    componentDidMount() {
        // this.props.actions.openRoomToConnect()
    }

    sendStart = (id) => {
        // console.log("ID route: ", id)
        this.geolocation.getCurrentPosition(location => {
                this.props.actions.AddNewPosition(location.coords.latitude, location.coords.longitude)
                this.props.apiActions.SendCurrentPosition({
                    id: id,
                    lat: location.coords.latitude,
                    lon: location.coords.longitude
                })
                this.props.actions.ChangeSend()
            }
        )

        //     // this.props.actions.AddNewPosition(location.coords.latitude, location.coords.longitude)
        //     console.log(location);
        //     const payload = {
        //         "id": id,
        //         "lat": location.coords.latitude, 
        //         "lon": location.coords.longitude
        //     };
        //     console.log("[MAIN_PAGE]: Sending payload: ", payload)

        //     this.props.actions.AddNewPosition(location.coords.latitude, location.coords.longitude)
        //     this.props.apiActions.SendCurrentPosition({
        //         "id": id,
        //         "lat": location.coords.latitude, 
        //         "lon": location.coords.longitude
        //     })
        // },() => {
        //     const payload = {
        //         "id": id,
        //         "lat": 55.026444, 
        //         "lon": 82.93203729999999
        //     };
        //     console.log("[MAIN_PAGE]: Sending payload: ", payload)
        //     this.props.apiActions.SendCurrentPosition({
        //         payload
        //     })

        // }
        // )

        // Axios.post("http://localhost:8888/points", JSON.stringify({
        //     "id": "hackaton",
        //     "lon": 54.34,
        //     "lat": 56.45,
        // }))
        // .then(resp => console.log("success"))
        // .catch(err => console.log("err"))

        //     fetch("http://localhost:8888/points", {method: "POST", body: JSON.stringify({
        //         "id": "hackaton",
        //         "lan": 54.34,
        //         "lat": 56.45,
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        // }
        // )
        //     .then(resp => {
        //         console.log(resp.json())
        //     })
        //     .catch(err => {
        //         console.log("Error request: ", err)
        //     })
        //     this.props.apiActions.SendCurrentPosition({
        //         "id": id,
        //         "lon": 83.23512,
        //         "lat": 52.432
        //     })

        //     this.props.apiActions.SendCurrentPosition({
        //         "id": "hackaton",
        //         "lon": 56.4,
        //         "lat": 54.4
        //     })
    }

    checkStatus = (status) => {
        switch (status) {
            case "alert":
                window.navigator.vibrate(10000);
                return
            case "close":
                window.navigator.vibrate(500);
                return
            default:
                return;
        }
    }

    render = () => {
        setInterval(this.sendStart(this.props.userStore.route.id), 1000)
        // console.log("stores: ", this.props);
        const {status} = this.props.currentPosition;

        this.checkStatus(status);

        return (
            <div className="main_page_container">
                <Header/>
                <div className="hor_container">
                    <SearchPanel/>
                    <HistoryContainer/>
                </div>
                <MapGoogle/>
            </div>
        )
    }
}

function mapStore(state) {
    return {
        store: state.MPI_mainPageState,
        currentPosition: state.PUI_positionUser,
        userStore: state.RPI_routesPartState
    }
}

function mapDispatches(dispatch) {
    return {
        actions: bindActionCreators(PositionActions, dispatch),
        apiActions: bindActionCreators(SendPosition, dispatch)
    }
}

export default connect(mapStore, mapDispatches)(MainPageContainer)