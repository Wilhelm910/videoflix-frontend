import { Link } from "react-router-dom"
import { CustomLinkNewProps } from "../types/types"


export default function CustomLinkNew({ props }: CustomLinkNewProps) {

    const { to, content, layout, img } = props

    return (
        <>
            <Link to={to} className={layout}>
                {content}
                {img && <img src={img} alt="Logo" className="h-8" />}
            </Link >
        </>
    )
}
