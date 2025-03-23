import React, { useState } from "react";

import AddModal from "../components/AddModal";
import styles from "../styles/PortfolioOverview.module.scss";
import ActiveTable from "../components/ActiveTable";

const PortfolioOverview: React.FC = () => {
const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Portfolio Overview</h1>
      <button onClick={() => setIsModalOpen(true)}>Добавить</button>
      <ActiveTable />
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PortfolioOverview;
