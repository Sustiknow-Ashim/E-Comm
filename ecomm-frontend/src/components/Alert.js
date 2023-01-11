import { Alert } from "react-bootstrap";


const Message = (props) =>{
    return(
        <Alert key={props.variant} variant={props.variant}>
            {props.children}
        </Alert>
    )
}

Message.defaultProps = {
    variant : 'info'
}

export default Message;