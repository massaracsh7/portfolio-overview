import React, { useState } from "react";

import AddModal from "../components/AddModal";
import styles from "./PortfolioOverview.module.scss";
import ActiveTable from "../components/ActiveTable";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PortfolioOverview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useSelector((state: RootState) => state.assets);
  console.log(data);
  return (
    <div className={styles.container}>
      <header>
        <h1>Portfolio Overview</h1>
        <button onClick={() => setIsModalOpen(true)}>Добавить</button>
      </header>
      <main>
        <ActiveTable />
      </main>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PortfolioOverview;
