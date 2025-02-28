type SendButtonProps = {
    props: {
        content: string;
        layout: string;
    }
    buttonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: "submit" | "reset" | "button" | undefined
    disabled?: boolean
}


export default function SendButton({ props, buttonClick, type, disabled }: SendButtonProps) {

    const { content, layout } = props

    return (
        <button disabled={disabled} type={type} onClick={buttonClick} className={layout}>{content}</button>
    )
}
