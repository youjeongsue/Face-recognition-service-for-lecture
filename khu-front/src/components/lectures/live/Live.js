import React, { Component } from 'react';
import axios from 'axios'

import Screen from './Screen';
import Attendance from './Attendance';
import Selected from './Selected';

import './Live.css';

class Live extends Component{

    state={
        lecture_id : this.props.match.params.id,
        ip : "",
        boxToggleOn : false,
        screenToggleOn : false,
        //학생 명단(id and info) <- django
        students : {
        },
        //출석 명단(id) <- model at
        currentStudents : {
        },
        //box <- model fr
        box : {
        },
        landmarks : null,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.screenToggleOn === true){
            this.setState(
                { ip: this.element.value }
            );
        } else {
            this.setState(
                { ip: "" }
            );
        }
    }

    handleBoxToggle = (e) => {
        this.setState(state => ({
            boxToggleOn: !state.boxToggleOn
        }));
    }

    handleScreenToggle = (e) => {
        this.setState(state => ({
            screenToggleOn: !state.screenToggleOn
        }));
    }

    handleSelectedChange = (landmarks) => {
        this.setState({landmarks: landmarks});
    }

    getStudents = () => {
        const self = this;
        axios.get(`/students/${this.state.lecture_id}/`)
            .then( response => {
                self.setState({
                    students:response.data.students
                });
                // console.log(self.state.students);
            }).catch(function (error){
                // console.log(error);
            });
    }

    getBox = () => {
        const self = this;
        axios.get(`http://35.201.156.40:1219/modelfr?ip=http://${this.state.ip}/shot.jpg`)
            .then( response => {
                self.setState({
                    box:response.data.box
                });
                // console.log(self.state.box);
            }).catch(function (error){
                // console.log(error);
            });
    }

    getCurrentStudent = () => {
        const self = this;
        axios.get(`http://35.201.156.40:1219/modelat?ip=http://${this.state.ip}/shot.jpg`)
            .then( response => {
                self.setState({
                    currentStudents:response.data.id
                });
                // console.log(self.state.currentStudents);
            }).catch(function (error){
                // console.log(error);
            });
    }

    validIp = () => {
        if(this.state.ip==="") {
            return (
                <div className='invalid-screen'>수업 중이 아닙니다.</div>
            )
        } else {
            return (
                <Screen
                    lecture_id={this.state.lecture_id}
                    ip={this.state.ip}
                    boxToggleOn={this.state.boxToggleOn}
                    box={this.state.box}
                    onSelectedChange={this.handleSelectedChange}/>
            )
        }
    }

    UNSAFE_componentWillMount() {
        this.getStudents();
    }

    UNSAFE_componentDidMount() {
        this.getBox();
    }

    render(){
        const {
            ip,
            boxToggleOn,
            students,
            currentStudents,
            landmarks
        } = this.state;

        const {
            handleSubmit,
            handleBoxToggle,
            handleScreenToggle,
            getBox,
            getCurrentStudent,
            validIp
        } = this;

        return (
            <div className='live'>
                {getBox()}
                <div className='screen-wrapper'>
                    <div className='screen'>
                        {validIp()}
                    </div>
                    <div className='ip-form'>
                        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
                            <label>
                                <input className='ip-text' type="text" ref={el => this.element = el} placeholder="ip를 입력하세요"/>
                            </label>
                            <button className='ip-button' onClick={handleScreenToggle} type="submit">{this.state.screenToggleOn ? '수업 끝' : '수업 시작'}</button>
                        </form>
                        <button className='ip-button' onClick={getCurrentStudent}>출석체크</button>
                        <label>
                            <input className='ip-checkbox' type="checkbox" checked={boxToggleOn} onChange={handleBoxToggle}></input>
                            <p style={{ display: 'inline', marginLeft: '4px', fontSize: '15px'}}>show box</p>
                        </label>
                    </div>
                </div>
                <div className="info-wrapper">
                    <div className='attendance'>
                        <p>출석 명단</p>
                        <Attendance students={students} currentStudents={currentStudents}/>
                    </div>
                    <div className='selected'>
                        <p>학생 정보</p>
                        <Selected ip={ip} landmarks={landmarks} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Live;