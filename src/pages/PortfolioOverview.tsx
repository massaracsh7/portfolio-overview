import React, { useMemo, useState } from "react";

import AddModal from "../components/AddModal";
import styles from "./PortfolioOverview.module.scss";
import ActiveTable from "../components/ActiveTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateAssetPrice } from "../store/assetsSlice";
import useWebSocket from "../hooks/useWebSocket";

const PortfolioOverview: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolio = useSelector((state: RootState) => state.assets);

  const symbols = useMemo(
    () => portfolio.map((asset) => asset.name.toLowerCase()),
    [portfolio]
  );

  useWebSocket(symbols, (portfolio) => {
    const updatedAsset = {
      name: portfolio.s.replace("USDT", ""),
      price: parseFloat(portfolio.c),
      change24h: parseFloat(portfolio.P),
    };
    dispatch(updateAssetPrice(updatedAsset));
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfolio Overview</h1>
        <button onClick={() => setIsModalOpen(true)}>Добавить</button>
      </header>
      <main className={styles.main}>
        <ActiveTable portfolio={portfolio} />
      </main>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PortfolioOverview;
