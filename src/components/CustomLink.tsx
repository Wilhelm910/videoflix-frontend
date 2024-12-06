import { CustomLinkProps } from "../types/types"


export default function CustomLink({ props }: CustomLinkProps) {

    const { href, content, layout, img } = props

    return (
        <>
            <a href={href} className={layout}>
                {content}
                {img && <img src={img} alt="Logo" className="h-8" />}
            </a >
        </>
    )
}
