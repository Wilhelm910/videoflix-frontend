import Modal from '../components/Modal'
import CustomButton from '../components/CustomButton__'
import { SignUpButtonProps } from '../ui/ButtonProps.ui'

export default function SignUp() {
  return (
    <Modal title={"Forgot your password?"}>
    <p>We will send you an email with instructions to reset your password.</p>
    <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Email Address" />
    <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Enter a password" />
    <input className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Confirm Password" />
    <CustomButton props={SignUpButtonProps} />
  </Modal>
  )
}
