export type CustomLinkProps = {
    props: { href: string, content?: string, layout?: string, img?: string }
}

export type CustomLinkNewProps = {
    props: { to: string, content?: string, layout?: string, img?: string }
}

export type CustomButtonProps = {
    props: { content: string, layout?: string }
}

export type MovieData = {
    title: string;
    description: string;
    categories: string[];
    group: string;
    thumbnail: string
    favourite: boolean
    id: number
    video_file?: string
}


export type UserProps = {
    email: string
    password: string
    is_verified?: boolean
}


export type CustomLinkProps__ = {
    props: {
        to: string; 
        content?: string;
        layout?: string;
        img?: string;
        state?: Record<string, unknown>; // Optional: "state" erlaubt zusätzliche Daten
    };
}
