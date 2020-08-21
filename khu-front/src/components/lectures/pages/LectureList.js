import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './LectureList.css'

function reducer(state, action){
    switch (action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


function LectureList(){
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchLectures = async () => {
        dispatch({ type: 'LOADING'});
        try{
            const response = await axios.get(
                '/dashboard/'
            );
            dispatch({ type: 'SUCCESS', data: response.data});
        } catch (e){
            dispatch({ type: 'ERROR', error: e});
        }
    };

    useEffect(() => {
        fetchLectures();
    }, []);

    const { loading, data: lectures, error } = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!lectures) return null;

    return (
        <div className='list-wrapper'>
            <div className='ui relaxed grid'>
                {lectures.map(lecture => (
                    <div className='ui item' key={lecture.id}>
                        <Link to={`/dashboard/${lecture.id}/live`}>
                            <div className='icon'>
                                <div className='link'>{lecture.lecture_name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LectureList;