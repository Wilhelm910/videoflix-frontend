import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate("/home")
        }
    }, [])

    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Movies, TV shows, and more</h1>
            <p className="mt-4">
                Enter your email to create or reset your subscription
            </p>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Email Address"
                    className="bg-transparent px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white font-semibold rounded-full px-4 py-2">
                    Sign Up &gt;
                </button>
            </div>
        </div>
    )
}
