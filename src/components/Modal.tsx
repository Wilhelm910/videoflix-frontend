type ModalProps = {
    title: string;
    children?: React.ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
    return (
        <div className="bg-white rounded-3xl p-10 shadow-lg flex flex-col items-center text-center gap-5 w-96">
            <h1 className="text-3xl font-bold text-blue-500">{title}</h1>
            {children}
        </div>
    )
}
