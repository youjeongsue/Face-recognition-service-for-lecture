import React , { useState, useEffect } from 'react';
import axios from 'axios'

import './Selected.css';

const Selected = ({ landmarks }) => {
    const [ id, setId ] = useState(null);
    const [ student, setStudent ] = useState(null);

    const getID = async () => {
        // console.log(landmarks);
        try {
            const response = await axios.get(
                `http://35.201.156.40:1219/modelin?ip=http://112.187.144.65:2020/shot.jpg&landmark=${landmarks}`
            );
            setId(response.data.id);
            getStudent();
        } catch (e) {
            //error...
        }
    }

    const getStudent = async () => {
        // console.log(id);
        try {
            const response = await axios.get(`/student/${parseInt(id)+1}/`);
            setStudent(response.data.student);
        } catch (e) {
            //error...
        }
    }

    useEffect(() => {
        getID();
    }, id);

    const showStudent = (student) => {
        getID();
        if (!student) {
            return <div>없음</div>;
        } else {
            return (
                <div>
                    <div className='info'>{student['name']}</div>
                    <div className='info'>{student['department']}</div>
                    <table>
                        <tbody>
                            <tr>
                                <th>학번</th>
                                <td>{student['student_num']}</td>
                            </tr>
                            <tr>
                                <th>참여점수</th>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <div className='selected'>
            <div>{showStudent(student)}</div>
        </div>
    );
}

export default Selected;