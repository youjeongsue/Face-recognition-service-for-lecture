import React , { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import './Selected.css';

const Selected = ({ ip, landmarks }) => {
    const [ id, setId ] = useState(null);
    const [ student, setStudent ] = useState(null);

    useEffect(() => {
        const getID =  async () => {
            console.log(landmarks);
            try {
                const response = await axios.get(
                    `http://35.201.156.40:1219/modelin?ip=http://${ip}/shot.jpg&landmark=${landmarks}`
                );
                setId(response.data.id);
                getStudent();
            } catch (e) {
                //error...
            }
        }
    
        //id가 같으면 useMemo 사용할 수 있을 것 같다!
        const getStudent = async () => {
            console.log(id);
            try {
                const response = await axios.get(`/student/${parseInt(id)+1}/`);
                setStudent(response.data.student);
            } catch (e) {
                //error...
            }
        }

        getID();
    }, [landmarks]);

    const showStudent = (student) => {
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