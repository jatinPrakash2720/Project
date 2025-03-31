import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Options.module.css";

const Options = () => {
  const navigate = useNavigate();

  const handleStatsClick = () => {
    navigate("/current-mission-stats");
  };

  const handleFutureMissionsClick = () => {
    navigate("/future-missions");
  };

  const handlePastMissionsClick = () => {
    navigate("/past-missions");
  };

  const handleDetailsClick = (id) => {
    navigate(`/mission-details/${id}`);
  };

  // Border mission data for the bottom section
  const borderMissionsData = [
    {
      id: 1,
      title: "India-China Border (LAC)",
      regions: [
        {
          name: "Ladakh",
          locations:
            "Galwan Valley, Pangong Tso, Depsang Plains, Hot Springs, Demchok",
          description: "Frequent standoffs between Indian and Chinese troops.",
        },
        {
          name: "Arunachal Pradesh",
          locations: "Tawang, Asaphila, Tuting, Dibang Valley",
          description:
            "China claims Arunachal Pradesh as part of its territory.",
        },
        {
          name: "Uttarakhand",
          locations: "Barahoti",
          description: "Minor clashes and airspace violations occur.",
        },
        {
          name: "Sikkim",
          locations: "Naku La, Doklam",
          description:
            "The Doklam standoff in 2017 was a major India-China conflict.",
        },
      ],
    },
    {
      id: 2,
      title: "India-Pakistan Border (LoC & IB)",
      regions: [
        {
          name: "Jammu and Kashmir",
          locations: "Poonch, Rajouri, Uri, Kupwara, Kargil, Gurez, Tangdhar",
          description:
            "Frequent ceasefire violations and infiltration attempts.",
        },
        {
          name: "Siachen Glacier",
          locations: "Siachen Glacier",
          description:
            "The highest battleground in the world; strategic military importance.",
        },
        {
          name: "Punjab",
          locations: "Pathankot, Gurdaspur, Ferozepur",
          description: "Cross-border terrorism and smuggling routes.",
        },
        {
          name: "Rajasthan",
          locations: "Jaisalmer, Barmer, Sri Ganganagar",
          description: "Historically tense during wars.",
        },
      ],
    },
    {
      id: 3,
      title: "India-Myanmar Border",
      regions: [
        {
          name: "Manipur & Nagaland",
          locations: "Moreh, Mon, Noklak, Champhai",
          description: "Insurgency and cross-border militant activities.",
        },
      ],
    },
  ];

  return (
    <div className={styles.optionsContainer}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      {/* Top section with three simplified blocks */}
      <div className={styles.topSectionGrid}>
        {/* Future Missions Planning */}
        <div className={styles.simpleCard}>
          <h2 className={styles.cardTitle}>Future Missions Planning</h2>
          <p className={styles.cardDescription}>
            Plan and prepare upcoming border security operations and deployments
          </p>
          <button
            className={styles.optionButton}
            onClick={handleFutureMissionsClick}
          >
            Plan Missions
          </button>
        </div>

        {/* Current Mission Stats */}
        <div className={styles.simpleCard}>
          <h2 className={styles.cardTitle}>Current Mission Stats</h2>
          <p className={styles.cardDescription}>
            View comprehensive statistics of all active border security
            operations
          </p>
          <button className={styles.optionButton} onClick={handleStatsClick}>
            View Details
          </button>
        </div>

        {/* Previous Mission Details */}
        <div className={styles.simpleCard}>
          <h2 className={styles.cardTitle}>Previous Mission Details</h2>
          <p className={styles.cardDescription}>
            Access historical data and outcomes of completed border operations
          </p>
          <button
            className={styles.optionButton}
            onClick={handlePastMissionsClick}
          >
            View History
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <h2 className={styles.sectionTitle}>Active Border Details</h2>
      </div>

      {/* Direct mission content instead of the On-going Missions box */}
      <div className={styles.activeMissionsContainer}>
        {borderMissionsData.map((border) => (
          <div key={border.id} className={styles.borderSection}>
            <h2 className={styles.borderTitle}>{border.title}</h2>
            <div className={styles.regionsGrid}>
              {border.regions.map((region, index) => (
                <div key={index} className={styles.missionCard}>
                  <h3>{region.name}</h3>
                  <div className={styles.missionDetails}>
                    <p>
                      <strong>Key Locations:</strong> {region.locations}
                    </p>
                    <p>
                      <strong>Status:</strong> {region.description}
                    </p>
                  </div>
                  <button
                    className={styles.detailsButton}
                    onClick={() => handleDetailsClick(border.id)}
                  >
                    Further Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
