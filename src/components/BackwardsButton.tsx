
type BackwardsButtonProps = {
    onClick: () => void
}


export default function BackwardsButton({ onClick }: BackwardsButtonProps) {
    return (
        <button onClick={onClick} className="focus:outline-none active:scale-90 transition-transform duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
        </button>
    )
}
