import useErrors from "./useErrors";

export default function useValidation() {
  // Call useErrors inside the function, not at module level
  // This ensures the error ref is provided before we try to use it
  const { $error } = useErrors();

  const isPasswordValid = (password: string) => {
    if (password.length < 8) {
      $error.value = "Пароль должен быть не менее 8 символов!";
      return false;
    }
    if (password.toLowerCase() == password.toUpperCase()) {
      $error.value = "Пароль должен содержать заглавные и строчные буквы!";
      return false;
    }
    return true;
  };

  const arePasswordsSame = (pwd1: string, pwd2: string) => {
    if (pwd1 != pwd2) {
      $error.value = "Пароли не совпадают!";
      return false;
    }
    return true;
  };

  return { isPasswordValid, arePasswordsSame };
}
