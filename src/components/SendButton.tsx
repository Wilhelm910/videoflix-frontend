type SendButtonProps = {
    props: {
        content: string;
        layout: string;
    }
    buttonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: "submit" | "reset" | "button" | undefined
}


export default function SendButton({ props, buttonClick, type }: SendButtonProps) {

    const { content, layout } = props

    return (
        <button type={type} onClick={buttonClick} className={layout}>{content}</button>
    )
}
