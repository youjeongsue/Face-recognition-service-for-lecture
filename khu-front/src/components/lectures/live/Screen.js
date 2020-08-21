import React, { Fragment } from 'react';
import './Screen.css'

const Screen = ({ lecture_id, ip, boxToggleOn, box, onSelectedChange }) => {
    // const [ student, setStudent ] = useState(null);

    const getStudent = (landmarks) => {
        onSelectedChange(landmarks);
        console.log('click');
    }

    const showFrame = () => {
        try {
            return box.map((frame, index) => {
                return <button
                            key={index} type="button"
                            className={"button " + ( boxToggleOn ? null : 'ghost')}
                            onClick={() => getStudent(frame.landmarks)}
                            style={{ left: frame.x1*(700/960), top: frame.y1*(400/540),
                                    width: (frame.x2-frame.x1)*(700/960), height: (frame.y2-frame.y1)*(400/540) }}>
                        </button>
            })
        } catch (e) {
            return (
                null
            )
        }
    }

    return (
        <div>
            <div className="screen">
                <img className="screen-video" src={`http://${ip}/video`} alt="수업 중이 아닙니다."></img>
                <Fragment>{showFrame({box})}</Fragment>
                <iframe title="settings" className="screen-settings" src={`http://${ip}/settings_window.html`} frameBorder="0"/>
            </div>
        </div>
    )
};


export default Screen;