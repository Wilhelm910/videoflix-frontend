import { buttonAndLinkStyle } from "../styles/buttonAndLink.style"
import logo from '../assets/logo.svg';

export const HeaderLinkProps = {
    content: "Log In",
    to: "/login",
    layout: buttonAndLinkStyle
}

export const HeaderLogoutLinkProps = {
    content: "Log Out",
    to: "/",
    layout: buttonAndLinkStyle
}

export const HeaderLogoProps = {
    to: "/#/welcome",
    img: logo
}

export const DataProtectionLinkProps = {
    content: "Datenschutz",
    to: "/datenschutz",
    layout: "p-8"
}

export const ImpressumLinkProps = {
    content: "Impressum",
    to: "/impressum",
    layout: "p-8"
}

export const ForgotPasswordLinkProps = {
    content: "Forgot Password?",
    to: "/forgotPassword",
    layout: "text-blue-500 transform transition hover:scale-105 active:scale-95"
}

export const SignUpLinkProps = {
    content: "Sign Up now",
    to: "/signUp",
    layout: "text-blue-500 transform transition hover:scale-105 active:scale-95"
}

export const SignUpLinkWelcomePageProps = {
    content: "Sign Up >",
    to: "/signUp",
    layout: buttonAndLinkStyle
}