import React from 'react';

const Attendance = ({students, currentStudents}) => {

    function showStudents(){
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

    // function showStudents(){
    //     try{
    //         return (
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>번호</th>
    //                         <th>이름</th>
    //                         <th>학번</th>
    //                         <th>출결</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {}
    //                 </tbody>
    //             </table>
    //         )
    //     } catch (e) {
    //         return null;
    //     }
    // }

    return (
        <div>
            <div>{showStudents()}</div>
        </div>
    );
};

export default Attendance;