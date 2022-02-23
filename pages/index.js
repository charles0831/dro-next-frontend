import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "styles/Home.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return <div className={styles.container}></div>;
}
