import React, {Component} from 'react';

import { YMaps, Map, RouteEditor } from 'react-yandex-maps'; 

import {connect} from 'react-redux';

import * as RoutesActions from '../../Store/RoutesPart/actions';

import './style.scss';
import { bindActionCreators } from 'redux';

class MapContainer extends Component{
    constructor(props){
        super(props);

        this.map = null
        this.ymaps = null
    }

    handleClick = (event) => {
        console.log("Map clicked: ", event.target)   
    }

    componentDidMount(){
        this.props.routesService.GetRoutesFromBackend()
    }

    handleApiAvaliable = ymaps => {
        console.log("create connect", this.props.store)
        const {route, points} = this.props.store;

        this.addRouteToMap(ymaps, {
            name: route.name,
            points: points
        })
      };

    addRouteToMap = (ymap, route) => {

        const balloonContentBodyLayout = ymap.templateLayoutFactory.createClass(
        `<div>${route.name}</div>`
      ); 
        console.log("Points: ", route.points);
        ymap
          .route(
                route.points,
                {
                    balloonContentBodyLayout
                }
          )
          .then(route => {
            route.getPaths().options.set({
              // в балуне выводим только информацию о времени движения с учетом пробок
              // можно выставить настройки графики маршруту
              strokeColor: "0000ffff",
              opacity: 0.9
            });
    
            // добавляем маршрут на карту
            this.map.geoObjects.add(route);
          });
    }

  
    render = () => {
        
        return (
            <div className="map_container">
                <div className="header">Route Signaller</div>
                <YMaps 
                onApiAvaliable={ymaps => this.handleApiAvaliable(ymaps)}
                >
                    <Map width={1200}
                    height={500} 
                    state={{center: [55.02942,82.92646], zoom: 16 }} onClick={this.handleClick.bind(this)}
                    instanceRef={ref => (this.map = ref)}
                    >
                        <RouteEditor />
                    </Map>
                </YMaps>
            </div>
        )
    }
}

function mapStore(state){
    return {
        store: state.RPI_routesPartState
    }
}

function mapDispatches(dispatch){
    return {
        routesService: bindActionCreators(RoutesActions, dispatch)
    }
}

export default connect(mapStore, mapDispatches)(MapContainer)