import React from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./IdeaDescription.module.css";

const IdeaDescription = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Soldier Health Integrated Efficiency and Life Defense.
      </h1>

      <div className={styles.animationWrapper}>
        <TypeAnimation
          sequence={[
            "The Soldier Health Monitoring System (SHMS) is an innovative solution aimed at revolutionizing battlefield management and soldier safety through the integration of cutting-edge technologies such as IoT, machine learning, blockchain, and real-time data visualization. The project focuses on enhancing situational awareness, decision-making, and operational efficiency by monitoring both the physiological and psychological parameters of soldiers.",
            1500,
            // "Predictive threat analysis and risk assessment",
            // 1500,
            // "Smart border surveillance integration",
            // 1500,
            // "AI-driven mission planning and optimization",
            // 1500,
            // "Comprehensive border management solution",
            // 1500,
          ]}
          speed={62}
          repeat={Infinity}
          className={styles.typeAnimation}
        />
      </div>

      {/* <p className={styles.description}>
        A comprehensive platform for monitoring, managing, and optimizing border
        security operations. KAVACH integrates real-time soldier health data,
        environmental monitoring, and security intelligence to enhance border
        protection while ensuring the safety and efficiency of personnel.
      </p> */}
    </div>
  );
};

export default IdeaDescription;
