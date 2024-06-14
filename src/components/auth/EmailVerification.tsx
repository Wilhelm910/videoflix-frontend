import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { BASE_URL } from "../../static/api"

export default function EmailVerification() {

    const [verificationStatus, setVerificationStatus] = useState<string>("")
    const location = useLocation()


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get("token")
        console.log(`Token extracted from URL: ${token}`); // Debug-Ausgabe

        const sendVerificationRequest = async () => {
            try {
                const response = await fetch(`${BASE_URL}/verify-email/${token}`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json"
                        }
                    }
                )
                console.log(response)
                if (response.ok) {
                    let data = await response.json()
                    console.log(data)
                    console.log("test")
                    setVerificationStatus("success");
                } else {
                    setVerificationStatus("failure");
                }

            } catch (error) {
                console.error("Fehler bei der Verifizierung:", error);
                setVerificationStatus("error");
            }
        }


        if (token) {
            sendVerificationRequest()
        } else {
            setVerificationStatus("missing");
        }


    }, [location])

    let message;
    switch (verificationStatus) {
        case "success":
            message = "E-Mail erfolgreich verifiziert!";
            break;
        case "failure":
            message =
                "Fehler bei der E-Mail-Verifizierung. Bitte versuchen Sie es später erneut.";
            break;
        case "missing":
            message = "Kein Verifizierungstoken gefunden.";
            break;
        case "error":
            message = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
            break;
        default:
            message = "Verifizierung läuft...";
    }



    return (
        <div>{message}</div>
    )
}
