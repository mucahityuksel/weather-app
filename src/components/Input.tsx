type InputProps = {
    type: string;
    className?: string;
    placeholer?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Input = (props: InputProps) => {

    return (
        <input
            type={props.type}
            className={props.className}
            placeholder={props.placeholer}
            onChange={props.onChange}
        ></input>
    )

}

export default Input