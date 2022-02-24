import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import authAPI from "apis/auth";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import EyeCrossIcon from "public/images/eye-cross.svg";
import EyeIcon from "public/images/eye.svg";
import styles from "./signin.module.scss";
import globalStyles from "styles/GlobalStyles.module.scss";

export default function Login() {
  const router = useRouter();
  const [progressStatus, setProgressStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSetShowPass = (bool) => {
    setShowPass(bool);
  };

  const handleClickLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please input the email or password!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email is not validate. Please insert correct Email!");
      return;
    }
    setProgressStatus(true);
    authAPI
      .signin({ email: email, password: password })
      .then((response) => {
        setProgressStatus(false);
        if (response.code === 200) {
          toast.success(response.message);
          router.push("/dashboard");
        } else {
          toast.error(response.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setProgressStatus(false);
        toast.error(err.message);
      });
  };

  const validateEmail = (email) => {
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div
        className={
          "flex flex-wrap justify-center items-center relative min-h-screen " +
          styles.grayArea
        }
      >
        <div className={styles.grayAreaContent}>
          <div className={"w-full flex justify-start"}>
            <button
              className={styles.loginButton}
              onClick={() => router.push("/auth/signin")}
            >
              LOGIN
            </button>
            <button
              className={styles.registerButton}
              onClick={() => router.push("/auth/signup")}
            >
              REGISTRO
            </button>
          </div>
          {/* email input */}
          <div className={"w-full mt-9 " + styles.inputArea}>
            <input
              type="text"
              placeholder="Email"
              className={
                "w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white"
              }
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          {/* password input */}
          <div
            className={
              "w-full relative flex items-center mt-5 " + styles.inputArea
            }
          >
            <input
              type={showPass === true ? "text" : "password"}
              placeholder="Contraseña"
              className={
                "w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10"
              }
              value={password}
              onChange={handleChangePassword}
            />
            <div className={"absolute right-3 cursor-pointer"}>
              {showPass === true ? (
                <Image
                  src={EyeIcon}
                  alt=""
                  width={17}
                  height={17}
                  onClick={() => handleSetShowPass(false)}
                />
              ) : (
                <Image
                  src={EyeCrossIcon}
                  alt=""
                  width={17}
                  height={17}
                  onClick={() => handleSetShowPass(true)}
                />
              )}
            </div>
          </div>
          {/* signin button part */}
          <div className={"mt-9 flex justify-end items-center"}>
            <div>
              <button
                className={styles.enterButton}
                onClick={handleClickLogin}
                disabled={progressStatus}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {progressStatus && (
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={"spinningBubbles"} color="#006600" />
          </div>
        </div>
      )}
    </>
  );
}
