// import { Outlet, useLocation } from 'react-router-dom';
// import CustomLink from './CustomLink';
// import { DataProtectionLinkProps, HeaderLinkProps, HeaderLogoProps, HeaderLogoutLinkProps, ImpressumLinkProps } from '../ui/LinkProps.ui';
// import { ToastContainer, toast } from "react-toastify";
// import SendButton from './SendButton';
// import LogoutButton from './LogoutButton';
// import CustomButton__ from './CustomButton__';
// import { SettingsButtonProps } from '../ui/ButtonProps.ui';
// import { useState } from 'react';
// import Settings from '../pages/Settings';

// export default function Layout() {
//     const [openedSettings, setOpenedSettings] = useState(false)

//     const location = useLocation();
//     const currentRoute = location.pathname

//     console.log(location.pathname)

//     const openSettings = () => {
//         setOpenedSettings(true)
//     }

//     const closeSettings = (e) => {
//         e.stopPropagation()
//         setOpenedSettings(false)
//     }



//     return (
//         // <div className={currentRoute === "/home" ? "flex flex-col min-h-screen relative" : "flex flex-col min-h-screen relative"} >
//         <div className={`flex flex-col min-h-screen relative ${openedSettings && "bg-black bg-opacity-50 z-40"}`} onClick={(e) => closeSettings(e)}>

//             {/* Hintergrundbild */}
//             {currentRoute == "/welcome" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-welcome.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/login" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/signUp" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/forgotPassword" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/email-verification" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/password-reset" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {currentRoute == "/home" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-home.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
//             {/* Dunkles Overlay */}
//             <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>

//             {/* Header */}
//             <header className="text-white py-8 px-10 sm:px-20 z-20 flex justify-between items-center">
//                 <CustomLink props={HeaderLogoProps} />
//                 {/* <img src={logo} alt="Logo" className="h-8" /> */}
//                 <div className='flex gap-2'>
//                     <CustomButton__ props={SettingsButtonProps} buttonClick={openSettings} />
//                     {currentRoute == "/home" ? <LogoutButton type="button" props={HeaderLogoutLinkProps} /> : <CustomLink props={HeaderLinkProps} />}
//                 </div>
//                 <div className="absolute top-0 right-0 z-50">
//                     <ToastContainer />
//                 </div>
//             </header>

//             {/* Hauptinhalt */}
//             <main className="flex-1 z-10 sm:px-20 flex items-center box-border">
//                 {openedSettings && <Settings />}
//                 <Outlet />
//             </main>

//             {/* Footer */}
//             <footer className={`text-white flex items-center z-20 px-12 ${currentRoute === "/home" ? "justify-end" : "justify-center"}`}>
//                 <CustomLink props={DataProtectionLinkProps} />
//                 <CustomLink props={ImpressumLinkProps} />
//             </footer>
//         </div >
//     );
// }
import { Outlet, useLocation } from 'react-router-dom';
import CustomLink from './CustomLink';
import { DataProtectionLinkProps, HeaderLinkProps, HeaderLogoProps, HeaderLogoutLinkProps, ImpressumLinkProps } from '../ui/LinkProps.ui';
import { ToastContainer } from "react-toastify";
import SendButton from './SendButton';
import LogoutButton from './LogoutButton';
import CustomButton__ from './CustomButton__';
import { SettingsButtonProps } from '../ui/ButtonProps.ui';
import { useState } from 'react';
import Settings from '../pages/Settings';

export default function Layout() {
    const [openedSettings, setOpenedSettings] = useState(false);

    const location = useLocation();
    const currentRoute = location.pathname;

    console.log('Current Route:', currentRoute);
    console.log('Settings Opened:', openedSettings);

    const openSettings = () => {
        setOpenedSettings(true);
    };

    const closeSettings = (e) => {
        e.stopPropagation(); // Verhindert, dass Klicks auf das Modal selbst das Schließen auslösen
        setOpenedSettings(false);
    };

    return (
        <div className={`flex flex-col min-h-screen relative ${openedSettings && "bg-black bg-opacity-50 z-40"}`}>
            {/* Hintergrundbild */}
            {currentRoute === "/welcome" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-welcome.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/impressum" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-welcome.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/datenschutz" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-welcome.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/login" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/signUp" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/forgotPassword" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/email-verification" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/password-reset" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-account.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}
            {currentRoute === "/home" && <div className="absolute inset-0 bg-[url('/src/assets/bg-img-home.jpg')] bg-cover bg-center bg-no-repeat -z-10"></div>}

            {/* Dunkles Overlay */}
            <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>

            {/* Header */}
            <header className="text-white py-8 px-10 sm:px-20 z-20 flex justify-between items-center">
                <CustomLink props={HeaderLogoProps} />
                <div className='flex gap-2'>
                    {currentRoute === "/home" && <CustomButton__ props={SettingsButtonProps} buttonClick={openSettings} />}
                    {currentRoute === "/home" ? (
                        <LogoutButton type="button" props={HeaderLogoutLinkProps} />
                    ) : (
                        <CustomLink props={HeaderLinkProps} />
                    )}
                </div>
                <div className="absolute top-0 right-0 z-50">
                    <ToastContainer />
                </div>
            </header>

            {/* Modal für Einstellungen */}
            {openedSettings && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
                    onClick={(e) => closeSettings(e)} // Schließt Modal bei Klick auf Hintergrund
                >
                    <div
                        className="bg-white rounded-3xl p-10 shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()} // Verhindert das Schließen bei Klick auf das Modal
                    >
                        <Settings />
                    </div>
                </div>
            )}

            {/* Hauptinhalt */}
            <main className="flex-1 z-10 sm:px-20 flex items-center justify-center box-border">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={`text-white flex items-center z-20 px-12 ${currentRoute === "/home" ? "justify-end" : "justify-center"}`}>
                <CustomLink props={DataProtectionLinkProps} />
                <CustomLink props={ImpressumLinkProps} />
            </footer>
        </div>
    );
}

