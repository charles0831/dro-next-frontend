import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import Users from "apis/users";
import CodeConstant from "utils/CodeContant";
import authAPI from "apis/auth";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const [progressStatus, setProgressStatus] = useState(false);
  const [memberInfo, setMemberInfo] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }

    Users.getUsers()
      .then((res) => {
        if (res.data.code === CodeConstant.OK) {
          setMemberInfo(res.data.data);
        } else if (res.data.code === CodeConstant.UNAUTHORIZED) {
          router.push("/auth/signin");
        } else {
          console.log("changing page error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClickLogout = async () => {
    if (authAPI.signout()) {
      router.push("/");
    }
  };

  return (
    <div
      className={
        "flex flex-wrap justify-center items-center relative min-h-screen " +
        styles.grayArea
      }
    >
      <div className={styles.label + " text-lg"}>
        <p className="text-6xl">Welcome to Dashboard!</p>
        <br />
        <p className="text-2xl mb-7">You successfully logged in!</p>
        {memberInfo?.map((item, index) => (
          <p key={index} className="text-xl text-left">
            Email: {item.email}
          </p>
        ))}
        <div className={"mt-9 flex justify-end items-center"}>
          <div>
            <button
              className={styles.enterButton}
              onClick={handleClickLogout}
              disabled={progressStatus}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
