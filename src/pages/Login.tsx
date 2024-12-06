import CustomButton from "../components/CustomButton__";
import CustomLink from "../components/CustomLink";
import Modal from "../components/Modal";
import { LogInButtonProps } from "../ui/ButtonProps.ui";
import { ForgotPasswordLinkProps, SignUpLinkProps } from "../ui/LinkProps.ui";

export default function Login() {
    return (
        <>
            <Modal
                title={"Log In"}
            >
                <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Email Address" />
                <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Password" />
                <div className="flex items-center space-x-2 w-full">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-5 h-5 text-blue-500 border-2 border-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="remember" className="text-gray-700">
                        Remember me
                    </label>
                </div>
                <CustomButton props={LogInButtonProps} />
                <CustomLink props={ForgotPasswordLinkProps} />
                <div className="flex gap-2" >
                    <p>New to Videoflix?</p>
                    <CustomLink props={SignUpLinkProps} />
                </div>
            </Modal>
        </>
    )
}
