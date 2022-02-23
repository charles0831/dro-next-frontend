import styles from "styles/Home.module.scss";
import Api from "apis/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [progressStatus, setProgressStatus] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, []);

  const handleLoginClick = () => {
    console.log("+++++++++++++++++++++++++++++++");
    setProgressStatus(true);
    Api.auth()
      .then((response) => {
        setProgressStatus(false);
        if (response.code === 200) {
          toast.success(response.message);
          setSuccess(response.data);
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

  return (
    <div>
      <div className={styles.container}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 p-1 xs:col-span-12">
            <button
              name="button"
              className={styles.filterContainer}
              onClick={handleLoginClick}
            >
              {success !== "" ? "Logged In" : "Log In"}
            </button>
          </div>
          <div className="col-span-9 p-3 xs:col-span-12">
            <div className={styles.headerTitle}>{success}</div>
          </div>
        </div>
      </div>
      {progressStatus && (
        <div className={styles.loadingArea}>
          <div className={styles.loading}>
            <ReactLoading type={"spinningBubbles"} color="#006600" />
          </div>
        </div>
      )}
    </div>
  );
}
