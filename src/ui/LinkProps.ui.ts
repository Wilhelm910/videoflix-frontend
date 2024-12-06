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
    href: "/",
    img: logo
}

export const DataProtectionLinkProps = {
    content: "Datenschutz",
    href: "/#/Datenschutz",
    layout: "p-8"
}

export const ImpressumLinkProps = {
    content: "Impressum",
    href: "/#/Impressum",
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