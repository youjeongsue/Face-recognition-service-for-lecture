import React from 'react';

const Attendance = ({students, currentStudents}) => {

    function oldShowStudents(){
        try{
            return students.map(student => {
                return (currentStudents.find(function (n) {
                    return n === String(student['id']-1) }))
                    ? <li key={student['id']}>{student['name']} 출석</li>
                    : <li key={student['id']}>{student['name']} 결석</li>
            })
        } catch (e) {
            return null;
        }
    }

    function showStudents(){
        try{
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>학번</th>
                                <th>출결</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {
                                return (currentStudents.find(function (n) {
                                    return n === String(student['id']-1) }))
                                    ? (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{student['name']}</td>
                                            <td>{student['student_num']}</td>
                                            <td>O</td>
                                        </tr>
                                    )
                                    : (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{student['name']}</td>
                                            <td>{student['student_num']}</td>
                                            <td>X</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } catch (e) {
            return null;
        }
    }

    return (
        <div>
            <div>{showStudents()}</div>
        </div>
    );
};

export default Attendance;