import { Outlet, useLocation } from 'react-router-dom';
import CustomLink from './CustomLink';
import { DataProtectionLinkProps, HeaderLinkProps, HeaderLogoProps, HeaderLogoutLinkProps, ImpressumLinkProps } from '../ui/LinkProps.ui';

export default function Layout() {

    const location = useLocation();
    const currentRoute = location.pathname

    console.log(location.pathname)



    return (
        <div className={currentRoute === "/home" ? "flex flex-col min-h-screen relative" : "flex flex-col min-h-screen relative"} >
            {/* Hintergrundbild */}
            {currentRoute == "/welcome" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-welcome.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute == "/login" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute == "/signUp" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute == "/forgotPassword" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute == "/home" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-home.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {/* Dunkles Overlay */}
            <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>

            {/* Header */}
            <header className="text-white py-8 px-10 sm:px-20 z-20 flex justify-between items-center">
                <CustomLink props={HeaderLogoProps} />
                {/* <img src={logo} alt="Logo" className="h-8" /> */}
                {currentRoute == "/home" ? <CustomLink props={HeaderLogoutLinkProps} /> : <CustomLink props={HeaderLinkProps} />}
            </header>

            {/* Hauptinhalt */}
            <main className="flex-1 z-10 sm:px-20 overflow-y-auto flex justify-center items-center">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={`text-white flex items-center z-20 px-12 ${currentRoute === "/home" ? "justify-end" : "justify-center"}`}>
                <CustomLink props={DataProtectionLinkProps} />
                <CustomLink props={ImpressumLinkProps} />
            </footer>
        </div >
    );
}
