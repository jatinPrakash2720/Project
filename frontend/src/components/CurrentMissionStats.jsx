import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import styles from "./CurrentMissionStats.module.css";

const CurrentMissionStats = () => {
  const [soldierData, setSoldierData] = useState([]);
  const [strikeData, setStrikeData] = useState(null);
  const [strikeHistoryData, setStrikeHistoryData] = useState([]);
  const [hoveredSoldier, setHoveredSoldier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSoldierData = async () => {
    try {
      const response = await fetch(
        "https://fastapi-backend-for-kavach-production.up.railway.app"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch soldier data");
      }
      const data = await response.json();

      const processedData = data.efficiency_predictions.map(
        (efficiency, index) => {
          return {
            id: index + 1,
            name: `Soldier ${index + 1}`,
            efficiency: efficiency,
            temperature: data.soldier_data.Temperature[index],
            moisture: data.soldier_data.Moisture[index],
            water_content: data.soldier_data.Water_Content[index],
            spo2: data.soldier_data.SpO2[index],
            fatigue: data.soldier_data.Fatigue[index],
            drowsiness: data.soldier_data.Drowsiness[index],
            stress: data.soldier_data.Stress[index],
            heart_rate: data.soldier_data.Heart_Rate[index],
            respiration_rate: data.soldier_data.Respiration_Rate[index],
            systolic_bp: data.soldier_data.Systolic_BP[index],
            diastolic_bp: data.soldier_data.Diastolic_BP[index],
          };
        }
      );

      setSoldierData(processedData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching soldier data:", err);
      setError("Failed to fetch soldier data");
      setIsLoading(false);
    }
  };

  const fetchStrikeData = async () => {
    try {
      const response = await fetch(
        "https://fastapi-backend-for-kavach-production.up.railway.app/strike_efficiency"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch strike data");
      }
      const data = await response.json();
      setStrikeData(data.strike_success_probability);

      setStrikeHistoryData((prev) => {
        const newData = [
          ...prev,
          {
            time: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            strikeRate: data.strike_success_probability,
          },
        ];

        if (newData.length > 10) {
          return newData.slice(newData.length - 10);
        }
        return newData;
      });
    } catch (err) {
      console.error("Error fetching strike data:", err);
    }
  };

  useEffect(() => {
    fetchSoldierData();
    fetchStrikeData();

    const interval = setInterval(() => {
      fetchSoldierData();
      fetchStrikeData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sortedSoldiers = [...soldierData].sort(
    (a, b) => a.efficiency - b.efficiency
  );

  const getEfficiencyColorClass = (index, total) => {
    if (index < 3) return styles.lowEfficiency;
    if (index < 7) return styles.mediumEfficiency;
    return styles.highEfficiency;
  };

  const getBarColor = (efficiency) => {
    return efficiency >= 50 ? "#4cdfff" : "#ff7675";
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipName}>{data.name}</p>
          <p className={styles.tooltipSpec}>
            Temperature: {data.temperature.toFixed(1)}°C
          </p>
          <p className={styles.tooltipSpec}>
            Heart Rate: {data.heart_rate.toFixed(0)} bpm
          </p>
          <p className={styles.tooltipSpec}>SpO2: {data.spo2.toFixed(1)}%</p>
          <p className={styles.tooltipSpec}>
            Fatigue: {data.fatigue.toFixed(1)}%
          </p>
          <p className={styles.tooltipSpec}>
            Stress: {data.stress.toFixed(1)}%
          </p>
          <p className={styles.tooltipEff}>Efficiency: {data.efficiency}%</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>Loading mission stats...</div>
    );
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.currentMissionStatsContainer}>
      <h1 className={styles.heading}>MAIN DASHBOARD</h1>

      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <h2>Soldier Efficiency Graph</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={soldierData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              onMouseMove={(data) => {
                if (data.activePayload) {
                  setHoveredSoldier(data.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredSoldier(null)}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis dataKey="id" />
              <YAxis domain={[0, 70]} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="efficiency"
                fill="#9e9e9e"
                radius={[0, 0, 0, 0]}
                shape={(props) => {
                  const { x, y, width, height, value } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={getBarColor(value)}
                      stroke="none"
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Strike Rate Line Chart */}
        <div className={styles.chartCard}>
          <h2>Strike Rate Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={strikeHistoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis dataKey="time" />
              <YAxis
                domain={[0.5, 0.6]}
                ticks={[0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip formatter={(value) => value.toFixed(4)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="strikeRate"
                stroke="#ffb347"
                name="Strike Rate"
                dot={{ fill: "#ffb347", r: 4 }}
                activeDot={{ r: 6, fill: "#ff7675" }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Strike Rate */}
      <div className={styles.strikeRateCard}>
        <h2>Current Strike Success Probability</h2>
        <div className={styles.strikeRateValue}>
          {strikeData ? (strikeData * 100).toFixed(2) + "%" : "Loading..."}
        </div>
      </div>

      {/* Soldier Data Table */}
      <div className={styles.soldierListContainer}>
        <h2>Soldier Efficiency Rankings</h2>
        <table className={styles.soldierTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Soldier ID</th>
              <th>Vital Signs</th>
              <th>Efficiency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedSoldiers.map((soldier, index) => (
              <tr
                key={soldier.id}
                className={getEfficiencyColorClass(
                  index,
                  sortedSoldiers.length
                )}
              >
                <td>{index + 1}</td>
                <td>Soldier {soldier.id}</td>
                <td>
                  <div className={styles.vitalSigns}>
                    <span>HR: {soldier.heart_rate.toFixed(0)}</span>
                    <span>Temp: {soldier.temperature.toFixed(1)}°C</span>
                    <span>SpO2: {soldier.spo2.toFixed(0)}%</span>
                  </div>
                </td>
                <td>
                  <div className={styles.tableEfficiencyBar}>
                    <div
                      className={styles.tableEfficiencyFill}
                      style={{
                        width: `${soldier.efficiency}%`,
                        backgroundColor: getBarColor(soldier.efficiency),
                      }}
                    ></div>
                    <span>{soldier.efficiency}%</span>
                  </div>
                </td>
                <td>
                  <Link
                    to={`/soldier-details/${soldier.id}`}
                    className={styles.viewButton}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentMissionStats;
