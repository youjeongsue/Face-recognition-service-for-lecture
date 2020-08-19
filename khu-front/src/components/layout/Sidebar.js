import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = ({id}) => {    
    return (
        <div>
            <div className='link-wrapper'>
                <Link to={`/dashboard/${id}/live`} className='item'>수업</Link>
                <Link to={`/dashboard/${id}/students`} className='item'>학생 관리</Link>
                <Link to={`/dashboard/${id}/settings`} className='item'>수업 관리</Link>
            </div>
        </div>
    );
}

export default Sidebar;