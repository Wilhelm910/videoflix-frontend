import { useNavigate } from "react-router-dom"

type LogoutButtonProps = {
    props: {
        content: string;
        layout: string;
    }
    type: "submit" | "reset" | "button" | undefined
}


export default function LogoutButton({ props, type }: LogoutButtonProps) {
    const navigate = useNavigate()

    const { content, layout } = props

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate("/welcome")
    }

    return (
        <button type={type} onClick={handleLogout} className={layout}>{content}</button>
    )
}
