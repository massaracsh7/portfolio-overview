/* eslint-disable react-hooks/exhaustive-deps */
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { Asset } from "../types/types";
import { RootState } from "../store/store";
import { generateRandomColor } from "../utils/getRandomColor";
import React from "react";
import styles from "./PortfolioDiagram.module.scss";


ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioDiagram = () => {
  const portfolio: Asset[] = useSelector((state: RootState) => state.assets);
  const backgroundColors = React.useMemo(() => {
    return portfolio.length > 4
      ? portfolio.map(() => generateRandomColor())
      : ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  }, [portfolio.join(",")]);

  const data = {
    labels: portfolio.map((asset) => asset.name),
    datasets: [
      {
        data: portfolio.map((asset) => asset.portfolioShare),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div className={styles.inner}>
      <Pie data={data} />
    </div>
  );
};

export default PortfolioDiagram;
