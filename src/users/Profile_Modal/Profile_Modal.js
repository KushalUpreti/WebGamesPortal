import React from 'react';
import './Profile_Modal.css';
import Backdrop from '../../shared/UIElements/Backdrop/Backdrop';
import ProfileAvatar from '../../shared/UIElements/Avatar/Profile_Avatar';


const Profile_Modal = (props) => {
    return <>
        {props.show && <Backdrop remove={props.hide} />}
        <div className="Profile_Modal">
            <h3>{props.text}</h3>
            <div>
                {
                    props.data.map((item) => {
                        return <ProfileAvatar key={item.avatarId || item.backgroundImageId}
                            id={item.avatarId || item.backgroundImageId}
                            imageUrl={item.avatarUrl || item.backgroundUrl}
                            changeImage={props.function}
                        ></ProfileAvatar>
                    })
                }
            </div>

        </div>
    </>
}

export default Profile_Modal;