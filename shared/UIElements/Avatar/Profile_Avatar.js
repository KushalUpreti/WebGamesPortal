import './Profile_Avatar.css';

const Profile_Avatar = (props) => {
    return <img className="Profile_Avatar" src={props.imageUrl} onClick={() => {
        props.changeImage(props.imageUrl, props.id)
    }} alt="dp"></img>
}

export default Profile_Avatar;