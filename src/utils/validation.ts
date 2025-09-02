type ValidationUserProps = {
  email: string;
  password: string;
};

type ValidationSignupProps = ValidationUserProps & { passwordConfirm: string };

const validateUser = (values: ValidationUserProps) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
};

const validationLogin = (values: ValidationUserProps) => {
  return validateUser(values);
};

const validationSignup = (values: ValidationSignupProps) => {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '' };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
};

export { validationLogin, validationSignup };
