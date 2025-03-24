/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { generateRandomColor } from "../utils/getRandomColor";
import React from "react";
import styles from "./PortfolioChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioChart = () => {
  const portfolio = useSelector((state: RootState) => state.assets);
  const backgroundColors = React.useMemo(() => {
    return portfolio.length > 4
      ? portfolio.map(() => generateRandomColor())
      : ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  }, [portfolio.join(",")]);

  const data = {
    labels: portfolio.map((asset) => asset.name),
    datasets: [
      {
        label: "Изменение за 24ч (%)",
        data: portfolio.map((asset) => asset.change24h),
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Изменение стоимости активов за 24ч",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Актив",
        },
      },
      y: {
        title: {
          display: true,
          text: "Изменение (%)",
        },
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PortfolioChart;
