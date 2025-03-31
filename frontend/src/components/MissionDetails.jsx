import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MissionDetails.module.css";

const MissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use the mock data based on the ID
    const fetchMissionData = () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          const data = getMissionById(parseInt(id));
          if (data) {
            setMissionData(data);
            setError(null);
          } else {
            setError("Mission not found");
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load mission details");
        setLoading(false);
      }
    };

    fetchMissionData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>Loading mission details...</div>
    );
  }

  if (error || !missionData) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error || "Mission not found"}</h2>
        <button onClick={handleBack} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <button
        style={{
          color: "var(--primary-text)",
          borderColor: "var(--primary-text)",
        }}
        onClick={handleBack}
        className={styles.backButton}
      >
        ← Back
      </button>

      <h1
        style={{ color: "var(--secondary-text)" }}
        className={styles.missionTitle}
      >
        {missionData.title}
      </h1>

      <div className={styles.overviewSection}>
        <h2>Mission Overview</h2>
        <p>{missionData.overview}</p>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h3>Active Personnel</h3>
            <p>{missionData.stats.personnel}</p>
          </div>
          <div className={styles.statItem}>
            <h3>Average Efficiency</h3>
            <p>{missionData.stats.avgEfficiency}%</p>
          </div>
          <div className={styles.statItem}>
            <h3>Threat Level</h3>
            <p>
              <span
                className={`${styles.threatLevel} ${
                  styles[missionData.stats.threatLevelClass]
                }`}
              >
                {missionData.stats.threatLevel}
              </span>
            </p>
          </div>
          <div className={styles.statItem}>
            <h3>Border Length</h3>
            <p>{missionData.stats.borderLength}</p>
          </div>
        </div>
      </div>

      <div className={styles.incidentsSection}>
        <h2>Recent Incidents</h2>
        <ul>
          {missionData.incidents.map((incident, index) => (
            <li key={index}>{incident}</li>
          ))}
        </ul>
      </div>

      <div className={styles.securitySection}>
        <h2>Security Measures</h2>
        <ul>
          {missionData.securityMeasures.map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>

      <div className={styles.regionsSection}>
        <h2>Key Regions</h2>
        <div className={styles.regionsGrid}>
          {missionData.regions.map((region, index) => (
            <div key={index} className={styles.regionCard}>
              <h3>{region.name}</h3>
              <div className={styles.regionDetail}>
                <strong>Key Locations:</strong>
                <span>{region.locations}</span>
              </div>
              <div className={styles.regionDetail}>
                <strong>Status:</strong>
                <span>{region.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mock data function to get mission by ID
const getMissionById = (id) => {
  const missions = [
    {
      id: 1,
      title: "India-China Border (LAC) Operations",
      overview:
        "The Line of Actual Control (LAC) is a demarcation line that separates Indian-controlled territory from Chinese-controlled territory. This mission oversees the security, surveillance, and management of forces along this sensitive border area, which has seen increasing tensions in recent years.",
      stats: {
        personnel: "12,000+",
        avgEfficiency: 84,
        threatLevel: "High",
        threatLevelClass: "threatHigh",
        borderLength: "3,488 km",
      },
      incidents: [
        "June 2023: Minor standoff at Pangong Tso resolved through diplomatic channels",
        "September 2023: Chinese drone sightings reported near Ladakh outposts",
        "January 2024: Infrastructure development detected on Chinese side near disputed areas",
        "March 2024: Temporary increase in Chinese patrols near Depsang Plains",
      ],
      securityMeasures: [
        "Advanced surveillance systems with thermal imaging capabilities",
        "Regular joint military exercises to improve coordination",
        "Satellite monitoring of border activities and infrastructural developments",
        "AI-powered image recognition systems for early detection of changes",
        "Integrated command centers with real-time intel sharing",
      ],
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
      title: "India-Pakistan Border (LoC & IB) Operations",
      overview:
        "The Line of Control (LoC) and International Border (IB) between India and Pakistan are among the most militarized borders in the world. This mission focuses on counter-terrorism, prevention of infiltration, and maintaining territorial integrity while managing a complex security environment.",
      stats: {
        personnel: "18,000+",
        avgEfficiency: 87,
        threatLevel: "Severe",
        threatLevelClass: "threatSevere",
        borderLength: "3,323 km",
      },
      incidents: [
        "May 2023: Infiltration attempt foiled in Rajouri sector",
        "August 2023: Ceasefire violation reported in Poonch district",
        "October 2023: Drone carrying weapons intercepted near Jammu",
        "February 2024: Underground tunnel discovered in Kathua sector",
      ],
      securityMeasures: [
        "Multi-tier border fence with smart surveillance systems",
        "Underground sensors to detect tunneling activities",
        "Regular patrolling with night vision equipment",
        "Counter-drone systems deployed at strategic locations",
        "Integrated Border Management System (IBMS) with real-time monitoring",
      ],
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
      title: "India-Myanmar Border Operations",
      overview:
        "The India-Myanmar border spans 1,643 km across challenging terrains including forests, mountains, and riverine areas. This mission addresses unique challenges including insurgency, cross-border movement of militant groups, illegal trade, and ethnic conflicts.",
      stats: {
        personnel: "6,500+",
        avgEfficiency: 82,
        threatLevel: "Moderate",
        threatLevelClass: "threatModerate",
        borderLength: "1,643 km",
      },
      incidents: [
        "July 2023: Insurgent group movement detected near Moreh",
        "November 2023: Weapons smuggling attempt intercepted at Champhai",
        "January 2024: Increased refugee movement due to internal Myanmar conflict",
        "April 2024: Joint operation with Myanmar forces against militant camps",
      ],
      securityMeasures: [
        "Coordinated patrolling with Myanmar forces under bilateral agreements",
        "Specialized units trained in jungle warfare and counter-insurgency",
        "Surveillance using UAVs adapted for forest canopy penetration",
        "Community engagement programs with border villages for intelligence gathering",
        "Integrated Check Posts (ICPs) at designated crossing points",
      ],
      regions: [
        {
          name: "Manipur & Nagaland",
          locations: "Moreh, Mon, Noklak, Champhai",
          description: "Insurgency and cross-border militant activities.",
        },
        {
          name: "Mizoram",
          locations: "Champhai, Zokhawthar",
          description: "Refugee movement and humanitarian concerns.",
        },
        {
          name: "Arunachal Pradesh",
          locations: "Changlang, Tirap",
          description: "Difficult terrain with limited infrastructure.",
        },
      ],
    },
  ];

  return missions.find((mission) => mission.id === id);
};

export default MissionDetails;
