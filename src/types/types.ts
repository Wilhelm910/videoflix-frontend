export type CustomLinkProps = {
    props: { href: string, content?: string, layout?: string, img?: string }
}

export type CustomButtonProps = {
    props: { content: string, layout?: string }
}

export type MovieData = {
    title: string;
    description: string;
    category: string;
    searchPhrase: string[];
}


export type UserProps = {
    email: string
    password: string
    is_verified?: boolean
}
