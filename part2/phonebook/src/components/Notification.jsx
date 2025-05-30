const Notification = (props) => {
    
    if(props.message === null){
        return null
    }
    else{
        return <div className={props.type}>
            {props.message}
        </div>
    }
}

export default Notification