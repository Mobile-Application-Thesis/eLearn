const SignUpForm = [
  {
    name: 'fullName',
    label: 'Fullname',
    errorMessage: 'Fullname is required!',
  },
  {
    name: 'username',
    label: 'Username',
    errorMessage: 'Nickname is required!',
  },
  {
    name: 'email',
    label: 'Email',
    errorMessage: 'Email is required!',
  },
  {
    name: 'password',
    label: 'Password',
    errorMessage: 'Password is required!',
    secureTextEntry: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    errorMessage: 'Confirm Password is required!',
    secureTextEntry: true,
  },
]

export default SignUpForm
