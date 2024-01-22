import { authApi } from "@/api/authApi";
import { ErrorResponse } from "@/types/response/errorResponse";
import { cookieUtils } from "@/utils/cookieUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface HandleLoginParametor {
  username: string;
  password: string;
}

interface HandleSignupParametor extends HandleLoginParametor {
  isPassDuplication: boolean;
  passwordConfirm: string;
}

const { setCookie, removeCookie } = cookieUtils();

const auth = (router: AppRouterInstance) => {
  async function handleUserLogin({ username, password }: HandleLoginParametor) {
    const isLoginValid = username.length < 2 && password.length < 4;

    if (isLoginValid) return alert("항목을 모두 확인해주세요.");

    try {
      const { data } = await authApi.userLogin(username, password);
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      const { status } = (error as ErrorResponse).response;
      if (status === 404) {
        alert("존재하지 않는 계정입니다.");
      } else {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
      }
    }
  }

  async function handleGuestLogin() {
    try {
      const { data } = await authApi.guestLogin();
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      alert("잘못된 요청입니다.");
    }
  }

  async function handleSignup({
    isPassDuplication,
    username,
    password,
    passwordConfirm,
  }: HandleSignupParametor) {
    const isSignupValid =
      !isPassDuplication ||
      username.length < 2 ||
      password.length < 4 ||
      password !== passwordConfirm;

    if (isSignupValid) return alert("항목을 모두 확인해주세요.");

    try {
      await authApi.signup(username, password, passwordConfirm);
      alert("회원가입 성공!");
      router.push("/login");
    } catch (error) {
      const { status } = (error as ErrorResponse).response;
      if (status === 400) return alert("비밀번호를 확인해주세요.");
      if (status === 409) return alert("이미 존재하는 계정입니다.");
    }
  }

  async function handleWithdrawal() {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        removeCookie();
        router.push("/todo");
      } catch (error) {
        alert("잘못된 요청입니다.");
      }
    }
  }

  return { handleUserLogin, handleGuestLogin, handleSignup, handleWithdrawal };
};

export default auth;
