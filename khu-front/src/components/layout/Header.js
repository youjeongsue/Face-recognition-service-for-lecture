import React  from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='ui inverted menu' style={{
            backgroundColor: '#44546A',
            borderRadius: '0',
            padding: '5px 0',
            margin: '0'}}>
                <Link to='/' className='item'>KHU-FaceID</Link>
        </div>
    );
};

export default Header;