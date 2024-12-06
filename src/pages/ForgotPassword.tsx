import CustomButton from "../components/CustomButton__";
import Modal from "../components/Modal";
import { ForgotPasswordButtonProps } from "../ui/ButtonProps.ui";

export default function ForgotPassword() {
  return (
    <Modal title={"Forgot your password?"}>
      <p>We will send you an email with instructions to reset your password.</p>
      <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Password" />
      <CustomButton props={ForgotPasswordButtonProps} />
    </Modal>
  )
}
