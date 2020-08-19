import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios'

import Sidebar from '../../layout/Sidebar';
import Live from '../live/Live';
import Students from '../Students';
import Settings from '../Settings';

import './Dashboard.css';

class Dashboard extends Component {
    state={
        lecture_id : this.props.match.params.id,
        lectureInfo : {
        },
    }

    getLectureInfo = () => {
        const self = this;
        axios.get(`/lecture/${this.state.lecture_id}/`)
            .then( response => {
                self.setState({
                    lectureInfo:response.data.lecture
                });
            }).catch(function (error){
            });
    }

    UNSAFE_componentWillMount() {
        this.getLectureInfo();
    }

    render() {
        const { lectureInfo } = this.state;
    
        return (
            <div className='dashboard-wrapper'>
                <div className='sidebar-wrapper'>
                    <Sidebar id={this.state.lecture_id}/>
                </div>
                <div className='dashboard'>
                    <p className='lecture-name'>{lectureInfo['lecture_name']}</p>
                    <div>
                        <Route path='/dashboard/:id/live' component={Live}></Route>
                        <Route path='/dashboard/:id/students' component={Students}></Route>
                        <Route path='/dashboard/:id/settings' component={Settings}></Route>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;