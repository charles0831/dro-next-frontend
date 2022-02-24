import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "styles/Home.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  }, []);

  return <div className={styles.container}></div>;
}
