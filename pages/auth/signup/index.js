import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import EyeCrossIcon from "public/images/eye-cross.svg";
import EyeIcon from "public/images/eye.svg";
import authAPI from "apis/auth";
import styles from "./signup.module.scss";
import globalStyles from "styles/GlobalStyles.module.scss";

export default function Register() {
  const router = useRouter();
  const [progressStatus, setProgressStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleSetShowPass = (bool) => {
    setShowPass(bool);
  };

  const handleSetShowRepeatPass = (bool) => {
    setShowRepeatPass(bool);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickRegister = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      toast.error("Please input the email or password!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email is not validate. Please insert correct Email!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Please confirm the password!");
      return;
    }
    setProgressStatus(true);
    authAPI
      .signup({ email: email, password: password })
      .then((response) => {
        setProgressStatus(false);
        if (response.code === 200) {
          toast.success(response.message);
          router.push("/auth/signin");
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
          "w-full min-h-screen flex flex-wrap justify-center items-center relative " +
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
          {/* repeat password input */}
          <div
            className={
              "w-full relative flex items-center mt-5 " + styles.inputArea
            }
          >
            <input
              type={showRepeatPass === true ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repetir contraseña"
              className={
                "w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10"
              }
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
            <div className={"absolute right-3 cursor-pointer"}>
              {showRepeatPass === true ? (
                <Image
                  src={EyeIcon}
                  alt=""
                  width={17}
                  height={17}
                  onClick={() => handleSetShowRepeatPass(false)}
                />
              ) : (
                <Image
                  src={EyeCrossIcon}
                  alt=""
                  width={17}
                  height={17}
                  onClick={() => handleSetShowRepeatPass(true)}
                />
              )}
            </div>
          </div>
          {/* signin button part */}
          <div className={"mt-9 flex justify-end items-center"}>
            <div>
              <button
                className={styles.enterButton}
                onClick={handleClickRegister}
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
