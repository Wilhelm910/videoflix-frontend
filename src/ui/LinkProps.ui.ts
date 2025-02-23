import { buttonAndLinkStyle } from "../styles/buttonAndLink.style"
import logo from '../assets/logo.svg';

export const HeaderLinkProps = {
    content: "Log In",
    href: "/#/login",
    layout: buttonAndLinkStyle
}

export const HeaderLogoutLinkProps = {
    content: "Log Out",
    href: "/",
    layout: buttonAndLinkStyle
}

export const HeaderLogoProps = {
    href: "/#/welcome",
    img: logo
}

export const DataProtectionLinkProps = {
    content: "Datenschutz",
    href: "/#/datenschutz",
    layout: "p-8"
}

export const ImpressumLinkProps = {
    content: "Impressum",
    href: "/#/impressum",
    layout: "p-8"
}

export const ForgotPasswordLinkProps = {
    content: "Forgot Password?",
    href: "/#/forgotPassword",
    layout: "text-blue-500"
}

export const SignUpLinkProps = {
    content: "Sign Up now",
    href: "/#/signUp",
    layout: "text-blue-500"
}

export const SignUpLinkWelcomePageProps = {
    content: "Sign Up >",
    to: "/signUp",
    layout: buttonAndLinkStyle
}