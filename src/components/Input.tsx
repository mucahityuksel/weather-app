type InputProps = {
    type: string;
    className?: string;
    placeholer?: string;
};

const Input = (props: InputProps) => {

    return (
        <input
            type={props.type}
            className={props.className}
            placeholder={props.placeholer}
        ></input>
    )

}

export default Input