type CustomButtonProps = {
    props: {
        content: string;
        layout: string;
    }
    buttonClick?: () => void;
}


export default function CustomButton({ props, buttonClick }: CustomButtonProps) {

    const { content, layout } = props

    return (
        <button onClick={buttonClick} className={layout}>{content}</button>
    )
}
