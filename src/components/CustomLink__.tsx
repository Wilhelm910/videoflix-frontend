import { Link } from "react-router-dom";
import { CustomLinkProps__ } from "../types/types";

export default function CustomLink__({ props }: CustomLinkProps__) {
    const { to, content, layout, img, state } = props;

    return (
        <Link to={to} className={layout} state={state}>
            {content}
            {img && <img src={img} alt="Logo" className="h-8" />}
        </Link>
    );
}
