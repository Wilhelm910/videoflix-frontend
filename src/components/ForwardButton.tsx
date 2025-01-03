
type ForwardButtonProps = {
    onClick: () => void
}

export default function ForwardButton({ onClick }: ForwardButtonProps) {
    return (
        <button onClick={onClick} className="focus:outline-none active:scale-90 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
        </button>
    )
}
