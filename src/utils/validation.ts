interface ValidationProps {
  email: string;
  password: string;
}

const validationLogin = (values: ValidationProps) => {
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

interface ValidationSignupProps extends ValidationProps {
  passwordConfirm: string;
}

const validationSignup = (values: ValidationSignupProps) => {
  const errors = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};

export { validationLogin, validationSignup };
