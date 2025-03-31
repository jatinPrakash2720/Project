import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FutureMissions.module.css";

const FutureMissions = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("");
  const [availableSoldiers, setAvailableSoldiers] = useState([]);
  const [selectedSoldiers, setSelectedSoldiers] = useState([]);

  // Border areas
  const borderAreas = [
    { id: "ladakh", name: "Ladakh (India-China Border)" },
    { id: "arunachal", name: "Arunachal Pradesh (India-China Border)" },
    { id: "kashmir", name: "Jammu & Kashmir (India-Pakistan Border)" },
    { id: "punjab", name: "Punjab (India-Pakistan Border)" },
    { id: "manipur", name: "Manipur & Nagaland (India-Myanmar Border)" },
  ];

  // Generate soldier data with random efficiency
  const generateSoldiers = (area) => {
    // Base soldiers by area (first 10 per area)
    const baseSoldiers = {
      ladakh: [
        {
          id: 1,
          name: "Major Raj Singh",
          rank: "Major",
          specialization: "High-altitude warfare",
          efficiency: 87,
        },
        {
          id: 2,
          name: "Captain Vikram Batra",
          rank: "Captain",
          specialization: "Mountain reconnaissance",
          efficiency: 92,
        },
        {
          id: 3,
          name: "Subedar Harjinder Singh",
          rank: "Subedar",
          specialization: "Artillery operations",
          efficiency: 78,
        },
        {
          id: 4,
          name: "Havildar Prem Kumar",
          rank: "Havildar",
          specialization: "Border patrol",
          efficiency: 81,
        },
        {
          id: 5,
          name: "Lieutenant Ananya Verma",
          rank: "Lieutenant",
          specialization: "Intelligence",
          efficiency: 85,
        },
        {
          id: 6,
          name: "Sepoy Kuldeep Singh",
          rank: "Sepoy",
          specialization: "Infantry",
          efficiency: 75,
        },
        {
          id: 7,
          name: "Lance Naik Rajesh Gurung",
          rank: "Lance Naik",
          specialization: "Combat engineer",
          efficiency: 79,
        },
        {
          id: 8,
          name: "Captain Mohan Chandra",
          rank: "Captain",
          specialization: "Logistics",
          efficiency: 83,
        },
        {
          id: 9,
          name: "Colonel Ajay Singh",
          rank: "Colonel",
          specialization: "Strategic operations",
          efficiency: 94,
        },
        {
          id: 10,
          name: "Sepoy Dinesh Kumar",
          rank: "Sepoy",
          specialization: "Communications",
          efficiency: 77,
        },
      ],
      arunachal: [
        {
          id: 11,
          name: "Captain Anant Sharma",
          rank: "Captain",
          specialization: "Jungle warfare",
          efficiency: 89,
        },
        {
          id: 12,
          name: "Major Kiran Rao",
          rank: "Major",
          specialization: "Mountain warfare",
          efficiency: 90,
        },
        {
          id: 13,
          name: "Havildar Prakash Tamang",
          rank: "Havildar",
          specialization: "Surveillance",
          efficiency: 82,
        },
        {
          id: 14,
          name: "Lieutenant Rajiv Khatri",
          rank: "Lieutenant",
          specialization: "Communications",
          efficiency: 84,
        },
        {
          id: 15,
          name: "Sepoy Arjun Gurung",
          rank: "Sepoy",
          specialization: "Infantry",
          efficiency: 76,
        },
        {
          id: 16,
          name: "Lance Naik Suresh Yadav",
          rank: "Lance Naik",
          specialization: "Pathfinding",
          efficiency: 80,
        },
        {
          id: 17,
          name: "Subedar Major Manish Jha",
          rank: "Subedar Major",
          specialization: "Command operations",
          efficiency: 88,
        },
        {
          id: 18,
          name: "Sepoy Farhan Khan",
          rank: "Sepoy",
          specialization: "Scout",
          efficiency: 79,
        },
        {
          id: 19,
          name: "Captain Riya Dutta",
          rank: "Captain",
          specialization: "Intelligence",
          efficiency: 87,
        },
        {
          id: 20,
          name: "Major Arjun Singh",
          rank: "Major",
          specialization: "Artillery",
          efficiency: 91,
        },
      ],
      kashmir: [
        {
          id: 21,
          name: "Captain Naveen Kumar",
          rank: "Captain",
          specialization: "Counter-terrorism",
          efficiency: 93,
        },
        {
          id: 22,
          name: "Major Aditya Singhal",
          rank: "Major",
          specialization: "Border operations",
          efficiency: 89,
        },
        {
          id: 23,
          name: "Lieutenant Rohan Kapoor",
          rank: "Lieutenant",
          specialization: "Surveillance",
          efficiency: 84,
        },
        {
          id: 24,
          name: "Sepoy Maninder Dhillon",
          rank: "Sepoy",
          specialization: "Infantry",
          efficiency: 77,
        },
        {
          id: 25,
          name: "Havildar Niranjan Patel",
          rank: "Havildar",
          specialization: "Artillery",
          efficiency: 82,
        },
        {
          id: 26,
          name: "Naik Deepak Choudhary",
          rank: "Naik",
          specialization: "Engineering",
          efficiency: 81,
        },
        {
          id: 27,
          name: "Captain Simran Kaur",
          rank: "Captain",
          specialization: "Intelligence",
          efficiency: 88,
        },
        {
          id: 28,
          name: "Lance Naik Jaswant Reddy",
          rank: "Lance Naik",
          specialization: "Combat support",
          efficiency: 80,
        },
        {
          id: 29,
          name: "Lt Col Ranjit Malhotra",
          rank: "Lieutenant Colonel",
          specialization: "Strategy",
          efficiency: 95,
        },
        {
          id: 30,
          name: "Naik Sukhwinder Bajwa",
          rank: "Naik",
          specialization: "Communications",
          efficiency: 79,
        },
      ],
      punjab: [
        {
          id: 31,
          name: "Major Harpreet Singh",
          rank: "Major",
          specialization: "Border security",
          efficiency: 90,
        },
        {
          id: 32,
          name: "Captain Jasdeep Kaur",
          rank: "Captain",
          specialization: "Intelligence",
          efficiency: 87,
        },
        {
          id: 33,
          name: "Subedar Gurbaksh Singh",
          rank: "Subedar",
          specialization: "Patrol operations",
          efficiency: 85,
        },
        {
          id: 34,
          name: "Havildar Amrit Pal",
          rank: "Havildar",
          specialization: "Surveillance",
          efficiency: 82,
        },
        {
          id: 35,
          name: "Lance Naik Joginder Singh",
          rank: "Lance Naik",
          specialization: "Border patrol",
          efficiency: 78,
        },
        {
          id: 36,
          name: "Sepoy Balwinder Singh",
          rank: "Sepoy",
          specialization: "Infantry",
          efficiency: 75,
        },
        {
          id: 37,
          name: "Captain Navjot Singh",
          rank: "Captain",
          specialization: "Tactical operations",
          efficiency: 89,
        },
        {
          id: 38,
          name: "Naik Satinder Kumar",
          rank: "Naik",
          specialization: "Communications",
          efficiency: 80,
        },
        {
          id: 39,
          name: "Lieutenant Amandeep Kaur",
          rank: "Lieutenant",
          specialization: "Logistics",
          efficiency: 83,
        },
        {
          id: 40,
          name: "Major Daljit Singh",
          rank: "Major",
          specialization: "Strategic planning",
          efficiency: 91,
        },
      ],
      manipur: [
        {
          id: 41,
          name: "Major Rohit Chauhan",
          rank: "Major",
          specialization: "Jungle warfare",
          efficiency: 88,
        },
        {
          id: 42,
          name: "Captain Abhishek Rawat",
          rank: "Captain",
          specialization: "Counter-insurgency",
          efficiency: 90,
        },
        {
          id: 43,
          name: "Subedar Lakshman Thapa",
          rank: "Subedar",
          specialization: "Border security",
          efficiency: 84,
        },
        {
          id: 44,
          name: "Havildar Manoj Negi",
          rank: "Havildar",
          specialization: "Reconnaissance",
          efficiency: 82,
        },
        {
          id: 45,
          name: "Lieutenant Anjali Mishra",
          rank: "Lieutenant",
          specialization: "Intelligence",
          efficiency: 86,
        },
        {
          id: 46,
          name: "Sepoy Prakash Tamang",
          rank: "Sepoy",
          specialization: "Infantry",
          efficiency: 79,
        },
        {
          id: 47,
          name: "Lance Naik Dilip Meitei",
          rank: "Lance Naik",
          specialization: "Patrolling",
          efficiency: 81,
        },
        {
          id: 48,
          name: "Captain Sudha Rao",
          rank: "Captain",
          specialization: "Medical corps",
          efficiency: 87,
        },
        {
          id: 49,
          name: "Naik Santosh Kumar",
          rank: "Naik",
          specialization: "Communications",
          efficiency: 80,
        },
        {
          id: 50,
          name: "Major Dinesh Mehta",
          rank: "Major",
          specialization: "Special operations",
          efficiency: 92,
        },
      ],
    };

    // Generate additional soldiers to make 50 total
    const allSoldiers = [...(baseSoldiers[area] || [])];

    // Add more soldiers for each area to reach 50
    const specializations = [
      "Infantry",
      "Artillery",
      "Reconnaissance",
      "Communications",
      "Intelligence",
      "Engineering",
      "Medical",
      "Logistics",
      "Special Forces",
      "Border Security",
    ];

    const ranks = [
      "Sepoy",
      "Lance Naik",
      "Naik",
      "Havildar",
      "Naib Subedar",
      "Subedar",
      "Subedar Major",
      "Lieutenant",
      "Captain",
      "Major",
      "Lieutenant Colonel",
    ];

    // Starting ID based on area
    const startingId =
      {
        ladakh: 101,
        arunachal: 201,
        kashmir: 301,
        punjab: 401,
        manipur: 501,
      }[area] || 101;

    // Generate additional soldiers to reach 50
    for (let i = allSoldiers.length; i < 50; i++) {
      const id = startingId + i;
      const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
      const randomSpec =
        specializations[Math.floor(Math.random() * specializations.length)];
      const efficiency = Math.floor(Math.random() * 30) + 65; // Random efficiency between 65-95

      // Generate a name based on region
      let firstName, lastName;

      if (area === "ladakh" || area === "arunachal") {
        const firstNames = [
          "Tenzin",
          "Dorje",
          "Sonam",
          "Pema",
          "Karma",
          "Lobsang",
          "Tsering",
          "Jamyang",
          "Wangchuk",
          "Dawa",
        ];
        const lastNames = [
          "Sherpa",
          "Bhutia",
          "Tamang",
          "Thapa",
          "Lama",
          "Gurung",
          "Rinpoche",
          "Norbu",
          "Gyaltsen",
          "Chodon",
        ];
        firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      } else if (area === "kashmir" || area === "punjab") {
        const firstNames = [
          "Arjun",
          "Vikram",
          "Rahul",
          "Rajiv",
          "Sanjay",
          "Ajay",
          "Amir",
          "Farhan",
          "Kabir",
          "Imran",
        ];
        const lastNames = [
          "Singh",
          "Kumar",
          "Sharma",
          "Malhotra",
          "Khanna",
          "Kapoor",
          "Khan",
          "Mirza",
          "Bhat",
          "Dar",
        ];
        firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      } else {
        // manipur
        const firstNames = [
          "Biren",
          "Meitei",
          "Sanjoy",
          "Thoiba",
          "Rojit",
          "Romesh",
          "Suresh",
          "Laishram",
          "Ningthemcha",
          "Tomba",
        ];
        const lastNames = [
          "Singh",
          "Kumar",
          "Sharma",
          "Devi",
          "Chanu",
          "Sana",
          "Moirangthem",
          "Thongam",
          "Keisham",
          "Luwang",
        ];
        firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      }

      allSoldiers.push({
        id,
        name: `${firstName} ${lastName}`,
        rank: randomRank,
        specialization: randomSpec,
        efficiency,
      });
    }

    return allSoldiers;
  };

  // Update available soldiers when area changes
  useEffect(() => {
    if (selectedArea) {
      setAvailableSoldiers(generateSoldiers(selectedArea));
      setSelectedSoldiers([]);
    }
  }, [selectedArea]);

  // Handle area selection
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  // Add soldier to team
  const addSoldier = (soldier) => {
    if (selectedSoldiers.length < 10) {
      setSelectedSoldiers([...selectedSoldiers, soldier]);
      setAvailableSoldiers(
        availableSoldiers.filter((s) => s.id !== soldier.id)
      );
    }
  };

  // Remove soldier from team
  const removeSoldier = (soldier) => {
    setSelectedSoldiers(selectedSoldiers.filter((s) => s.id !== soldier.id));
    setAvailableSoldiers(
      [...availableSoldiers, soldier].sort((a, b) => a.id - b.id)
    );
  };

  // Efficiency bar color based on level
  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return styles.excellent;
    if (efficiency >= 80) return styles.good;
    if (efficiency >= 70) return styles.average;
    return styles.poor;
  };

  return (
    <div className={styles.futureMissionsContainer}>
      <h1 className={styles.heading}>Future Mission Planning</h1>

      {/* Area Selection */}
      <div className={styles.areaSelection}>
        <label htmlFor="borderArea">Select Border Area:</label>
        <select
          id="borderArea"
          value={selectedArea}
          onChange={handleAreaChange}
          className={styles.areaDropdown}
        >
          <option value="">-- Select an area --</option>
          {borderAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      {selectedArea && (
        <div className={styles.teamBuildingSection}>
          <div className={styles.columnsContainer}>
            {/* Posted Soldiers (renamed from Available Soldiers) */}
            <div className={styles.soldierColumn}>
              <h2 className={styles.columnHeading}>Posted Soldiers</h2>
              <div className={styles.soldierList}>
                {availableSoldiers.map((soldier) => (
                  <div key={soldier.id} className={styles.soldierCard}>
                    <div className={styles.soldierInfo}>
                      <h3>{soldier.name}</h3>
                      <p>
                        {soldier.rank} | {soldier.specialization}
                      </p>
                      <div className={styles.efficiencyContainer}>
                        <span className={styles.efficiencyLabel}>
                          Efficiency:
                        </span>
                        <div className={styles.efficiencyBarContainer}>
                          <div
                            className={`${
                              styles.efficiencyBar
                            } ${getEfficiencyColor(soldier.efficiency)}`}
                            style={{ width: `${soldier.efficiency}%` }}
                          ></div>
                        </div>
                        <span className={styles.efficiencyValue}>
                          {soldier.efficiency}%
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.addButton}
                      onClick={() => addSoldier(soldier)}
                      disabled={selectedSoldiers.length >= 10}
                    >
                      Add
                    </button>
                  </div>
                ))}
                {availableSoldiers.length === 0 && (
                  <p className={styles.emptyMessage}>
                    No more soldiers available
                  </p>
                )}
              </div>
            </div>

            {/* Selected Team */}
            <div className={styles.soldierColumn}>
              <h2 className={styles.columnHeading}>Selected Team</h2>
              <div className={styles.soldierList}>
                {selectedSoldiers.map((soldier) => (
                  <div key={soldier.id} className={styles.soldierCard}>
                    <div className={styles.soldierInfo}>
                      <h3>{soldier.name}</h3>
                      <p>
                        {soldier.rank} | {soldier.specialization}
                      </p>
                      <div className={styles.efficiencyContainer}>
                        <span className={styles.efficiencyLabel}>
                          Efficiency:
                        </span>
                        <div className={styles.efficiencyBarContainer}>
                          <div
                            className={`${
                              styles.efficiencyBar
                            } ${getEfficiencyColor(soldier.efficiency)}`}
                            style={{ width: `${soldier.efficiency}%` }}
                          ></div>
                        </div>
                        <span className={styles.efficiencyValue}>
                          {soldier.efficiency}%
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeSoldier(soldier)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {selectedSoldiers.length === 0 && (
                  <p className={styles.emptyMessage}>
                    No soldiers selected yet
                  </p>
                )}
              </div>
              {selectedSoldiers.length > 0 && (
                <div className={styles.teamStats}>
                  <p>Team Size: {selectedSoldiers.length}/10</p>
                  <p>
                    Average Efficiency:{" "}
                    {Math.round(
                      selectedSoldiers.reduce(
                        (sum, soldier) => sum + soldier.efficiency,
                        0
                      ) / selectedSoldiers.length
                    )}
                    %
                  </p>
                </div>
              )}
              <button
                className={styles.finalizeMissionButton}
                disabled={selectedSoldiers.length === 0}
                onClick={() => alert("Mission team finalized and saved!")}
              >
                Finalize Mission Team
              </button>
            </div>
          </div>
        </div>
      )}

      <button className={styles.backButton} onClick={() => navigate("/admin")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default FutureMissions;
