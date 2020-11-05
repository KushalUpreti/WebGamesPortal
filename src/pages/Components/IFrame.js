import './IFrame.css'

const IFrame = (props) => {
    return (
        <iframe className="IFrame" title="gamespace" src={props.path}>

        </iframe>
    )
}

export default IFrame;