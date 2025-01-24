import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = sessionStorage.getItem("token"); // Prüfen, ob ein Token existiert

    if (!token) {
        return <Navigate to="/welcome" replace />; // Umleitung zu `/welcome`, wenn kein Token vorhanden ist
    }

    return <Outlet />; // Erlaubt den Zugriff auf die geschützte Route
}
