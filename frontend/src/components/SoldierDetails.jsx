import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./SoldierDetails.module.css";

const SoldierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soldierData, setSoldierData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use the mock data based on the ID
    const fetchSoldierData = () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          const data = getSoldierById(parseInt(id));
          if (data) {
            setSoldierData(data);
            setError(null);
          } else {
            setError("Soldier not found");
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load soldier details");
        setLoading(false);
      }
    };

    fetchSoldierData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>Loading soldier data...</div>
    );
  }

  if (error || !soldierData) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error || "Soldier not found"}</h2>
        <button onClick={handleBack} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Back
      </button>

      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>{soldierData.name.charAt(0)}</div>
        <div className={styles.profileInfo}>
          <h1 className={styles.soldierName}>{soldierData.name}</h1>
          <h2 className={styles.soldierRank}>{soldierData.rank}</h2>
          <div className={styles.soldierTags}>
            <span className={styles.tag}>{soldierData.specialization}</span>
            <span className={styles.tag}>ID: {soldierData.id}</span>
            <span className={styles.tag}>
              Efficiency: {soldierData.efficiency}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>Health Metrics</h2>

          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Body Temperature</div>
              <div className={styles.statValue}>
                {soldierData.metrics.temperature}°C
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Heart Rate</div>
              <div className={styles.statValue}>
                {soldierData.metrics.heart_rate} bpm
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SpO2</div>
              <div className={styles.statValue}>
                {soldierData.metrics.spo2}%
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Blood Pressure</div>
              <div className={styles.statValue}>{soldierData.metrics.bp}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Stress Level</div>
              <div className={styles.statValue}>
                {soldierData.metrics.stress}%
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Fatigue</div>
              <div className={styles.statValue}>
                {soldierData.metrics.fatigue}%
              </div>
            </div>
          </div>

          <div className={styles.healthGraph}>
            <h3 className={styles.healthGraphTitle}>30-Day Health Trend</h3>
            <div className={styles.graphContainer}>
              {/* In a real app, this would be a chart component */}
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                [Health metrics visualization would be displayed here]
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Mission History</h2>
          <div className={styles.missionHistory}>
            {soldierData.missions.map((mission, index) => (
              <div key={index} className={styles.missionItem}>
                <div className={styles.missionTitle}>{mission.name}</div>
                <div className={styles.missionDate}>{mission.date}</div>
                <div className={styles.missionDesc}>{mission.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightSection}>
          <h2 className={styles.sectionTitle}>Achievements & Medals</h2>
          {soldierData.achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementItem}>
              <div className={styles.achievementIcon}>🏅</div>
              <div className={styles.achievementInfo}>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}

          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
            Training & Skills
          </h2>
          <div className={styles.missionHistory}>
            {soldierData.skills.map((skill, index) => (
              <div key={index} className={styles.missionItem}>
                <div className={styles.missionTitle}>{skill.name}</div>
                <div className={styles.missionDate}>
                  Proficiency: {skill.level}
                </div>
                <div className={styles.missionDesc}>{skill.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data function to get soldier by ID
const getSoldierById = (id) => {
  const soldiers = [
    {
      id: 1,
      name: "Major Rajiv Sharma",
      rank: "Major",
      specialization: "Special Forces",
      efficiency: 92,
      metrics: {
        temperature: 36.7,
        heart_rate: 68,
        spo2: 98,
        bp: "120/80",
        stress: 22,
        fatigue: 15,
      },
      missions: [
        {
          name: "Operation Mountain Shield",
          date: "March 2024 - Present",
          description:
            "Leading tactical operations at the LAC in Ladakh sector, focusing on high-altitude surveillance and response strategy.",
        },
        {
          name: "Operation Blue Hawk",
          date: "November 2023 - February 2024",
          description:
            "Coordinated counter-infiltration operation along the LoC in Poonch sector.",
        },
        {
          name: "Operation Silent Guardian",
          date: "May 2023 - October 2023",
          description:
            "Special reconnaissance mission in eastern border regions.",
        },
      ],
      achievements: [
        {
          title: "Sena Medal",
          description: "Awarded for gallantry during Operation Blue Hawk, 2023",
        },
        {
          title: "Chief of Army Staff Commendation",
          description:
            "Recognition for exceptional leadership in high-altitude operations, 2022",
        },
        {
          title: "Distinguished Service Medal",
          description:
            "For coordinating rescue operations during natural disasters, 2020",
        },
      ],
      skills: [
        {
          name: "High-altitude Warfare",
          level: "Expert",
          description:
            "Specialized training in operations above 15,000 ft with adaptation to extreme weather conditions",
        },
        {
          name: "Tactical Leadership",
          level: "Advanced",
          description:
            "Proven ability to lead complex operations in sensitive border areas",
        },
        {
          name: "Counter-infiltration Techniques",
          level: "Expert",
          description:
            "Advanced training in detection and neutralization of infiltration attempts",
        },
      ],
    },
    {
      id: 12,
      name: "Major Kiran Rao",
      rank: "Major",
      specialization: "Mountain warfare",
      efficiency: 90,
      metrics: {
        temperature: 36.5,
        heart_rate: 62,
        spo2: 97,
        bp: "118/78",
        stress: 18,
        fatigue: 12,
      },
      missions: [
        {
          name: "Operation Himalayan Sentinel",
          date: "January 2024 - Present",
          description:
            "Leading mountain warfare operations in Arunachal Pradesh sector.",
        },
        {
          name: "Operation Eagle Eye",
          date: "August 2023 - December 2023",
          description:
            "Surveillance and intelligence gathering in high-altitude border areas.",
        },
        {
          name: "Operation Summit Shield",
          date: "February 2023 - July 2023",
          description:
            "Winter deployment in Sikkim sector to secure strategic mountain passes.",
        },
      ],
      achievements: [
        {
          title: "Vishisht Seva Medal",
          description:
            "For distinguished service of an exceptional order, 2023",
        },
        {
          title: "High Altitude Service Medal",
          description:
            "For continuous deployment above 14,000 ft for over 2 years",
        },
        {
          title: "Winter Warfare Commendation",
          description:
            "For exceptional performance during extreme winter operations, 2022",
        },
      ],
      skills: [
        {
          name: "Alpine Combat",
          level: "Expert",
          description:
            "Specialized in combat operations in snow-covered mountainous terrain",
        },
        {
          name: "Avalanche Rescue",
          level: "Advanced",
          description:
            "Trained in rapid response to avalanche incidents and high-altitude rescue",
        },
        {
          name: "Mountain Navigation",
          level: "Expert",
          description:
            "Proficient in navigation in GPS-denied environments using traditional methods",
        },
      ],
    },
    {
      id: 21,
      name: "Captain Naveen Kumar",
      rank: "Captain",
      specialization: "Counter-terrorism",
      efficiency: 93,
      metrics: {
        temperature: 36.8,
        heart_rate: 65,
        spo2: 99,
        bp: "122/78",
        stress: 25,
        fatigue: 18,
      },
      missions: [
        {
          name: "Operation Sentinel Guard",
          date: "February 2024 - Present",
          description:
            "Leading counter-terrorism operations in Jammu & Kashmir.",
        },
        {
          name: "Operation Urban Shield",
          date: "October 2023 - January 2024",
          description:
            "Specialized urban counter-terrorism deployment in sensitive areas.",
        },
        {
          name: "Operation Night Vigil",
          date: "May 2023 - September 2023",
          description:
            "Night operations focusing on preventing infiltration along the LoC.",
        },
      ],
      achievements: [
        {
          title: "Shaurya Chakra",
          description:
            "Awarded for gallantry during counter-terrorism operation, 2023",
        },
        {
          title: "Counter-Insurgency Operations Medal",
          description:
            "For exceptional service in counter-insurgency operations, 2022",
        },
        {
          title: "Special Operations Commendation",
          description: "For leading a high-risk hostage rescue operation, 2021",
        },
      ],
      skills: [
        {
          name: "CQB (Close Quarter Battle)",
          level: "Expert",
          description:
            "Advanced training in urban warfare and building clearance operations",
        },
        {
          name: "Hostage Rescue",
          level: "Advanced",
          description:
            "Specialized in high-risk hostage situation management and rescue",
        },
        {
          name: "Intelligence Analysis",
          level: "Intermediate",
          description:
            "Trained in field intelligence gathering and analysis for counter-terrorism",
        },
      ],
    },
  ];

  return soldiers.find((soldier) => soldier.id === id);
};

export default SoldierDetails;
