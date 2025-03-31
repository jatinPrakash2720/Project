import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Missions.module.css";

const Missions = () => {
  const navigate = useNavigate();

  const handleMissionClick = (id) => {
    navigate(`/mission-details/${id}`);
  };

  const handleSoldierClick = (id) => {
    navigate(`/soldier-details/${id}`);
  };

  // Border missions data
  const missionsData = [
    {
      id: 1,
      title: "India-China Border (LAC)",
      threatLevel: "High",
      personnel: "12,000+",
      location: "Northern and Eastern sectors",
      description:
        "Monitoring and securing the Line of Actual Control with advanced surveillance and tactical deployments.",
      keyPersonnel: [
        {
          id: 1,
          name: "Major Rajiv Sharma",
          rank: "Major",
          specialization: "Special Forces",
        },
        {
          id: 12,
          name: "Major Kiran Rao",
          rank: "Major",
          specialization: "Mountain warfare",
        },
      ],
    },
    {
      id: 2,
      title: "India-Pakistan Border (LoC & IB)",
      threatLevel: "Severe",
      personnel: "18,000+",
      location: "Western and Northwestern sectors",
      description:
        "Counter-terrorism operations and infiltration prevention along one of the world's most militarized borders.",
      keyPersonnel: [
        {
          id: 21,
          name: "Captain Naveen Kumar",
          rank: "Captain",
          specialization: "Counter-terrorism",
        },
      ],
    },
    {
      id: 3,
      title: "India-Myanmar Border",
      threatLevel: "Moderate",
      personnel: "6,500+",
      location: "Northeastern sector",
      description:
        "Addressing insurgency, cross-border movement, and ethnic conflicts across challenging terrain.",
      keyPersonnel: [],
    },
  ];

  const getThreatLevelClass = (level) => {
    switch (level) {
      case "Severe":
        return styles.threatSevere;
      case "High":
        return styles.threatHigh;
      case "Moderate":
        return styles.threatModerate;
      default:
        return "";
    }
  };

  return (
    <div className={styles.missionsContainer}>
      <h1 className={styles.heading}>Active Border Missions</h1>

      <div className={styles.missionsGrid}>
        {missionsData.map((mission) => (
          <div key={mission.id} className={styles.missionCard}>
            <h2 className={styles.missionTitle}>{mission.title}</h2>

            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Threat Level:</span>
                <span
                  className={`${styles.threatLevel} ${getThreatLevelClass(
                    mission.threatLevel
                  )}`}
                >
                  {mission.threatLevel}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Personnel:</span>
                <span>{mission.personnel}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Location:</span>
                <span>{mission.location}</span>
              </div>
            </div>

            <p className={styles.missionDescription}>{mission.description}</p>

            {mission.keyPersonnel.length > 0 && (
              <div className={styles.keyPersonnel}>
                <h3>Key Personnel</h3>
                <div className={styles.personnelList}>
                  {mission.keyPersonnel.map((person) => (
                    <div
                      key={person.id}
                      className={styles.personnelItem}
                      onClick={() => handleSoldierClick(person.id)}
                    >
                      <div className={styles.personnelInitial}>
                        {person.name.charAt(0)}
                      </div>
                      <div className={styles.personnelInfo}>
                        <span className={styles.personnelName}>
                          {person.name}
                        </span>
                        <span className={styles.personnelRole}>
                          {person.rank} • {person.specialization}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className={styles.viewDetailsButton}
              onClick={() => handleMissionClick(mission.id)}
            >
              View Mission Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
