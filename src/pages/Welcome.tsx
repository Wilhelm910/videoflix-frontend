import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { SignUpLinkWelcomePageProps } from "../ui/LinkProps.ui";
import CustomLink__ from "../components/CustomLink__";

export default function Welcome() {
    const navigate = useNavigate()
    const [emailAddress, setEmailAddress] = useState<string>()

    useEffect(() => {
        const cookieToken = Cookies.get("token")
        if (sessionStorage.getItem("token")) {
            navigate("/home")
        } else if (cookieToken) {
            sessionStorage.setItem("token", cookieToken)
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
                    name="emailAddress"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <CustomLink__ props={{
                    ...SignUpLinkWelcomePageProps, // Nimmt alle bestehenden Eigenschaften aus SignUpLinkWelcomePageProps
                    state: { email: emailAddress }, // Fügt eine neue Eigenschaft hinzu oder überschreibt eine bestehende
                }} />
            </div>
        </div>
    )
}
