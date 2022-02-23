import React from "react";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <div
      className={
        "flex flex-wrap justify-center items-center relative min-h-screen " +
        styles.grayArea
      }
    >
      <div className={styles.label + " text-lg"}>
        <p className="text-2xl">This page could not be found.</p>
      </div>
    </div>
  );
};

export default Custom404;
