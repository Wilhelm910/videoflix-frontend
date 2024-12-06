type CustomButtonProps = {
    content: string;
    layout: string;
    buttonClick?: () => void;
}


export default function CustomButton({ content, layout, buttonClick }: CustomButtonProps) {


    return (
        <button onClick={buttonClick} className={layout}>{content}</button>
    )
}
