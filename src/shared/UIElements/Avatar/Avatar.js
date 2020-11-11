import './Avatar.css';

const Avatar = (props) => {
    return (
        <div className="Avatar">
            <img className="img-small" src={props.imageUrl} alt="dp"></img>
            <h3 className="name">{props.name}</h3>
        </div>
    );
}

export default Avatar;