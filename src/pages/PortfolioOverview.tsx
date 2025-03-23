import React, { useEffect, useState } from "react";

import AddModal from "../components/AddModal";
import styles from "./PortfolioOverview.module.scss";
import ActiveTable from "../components/ActiveTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  closeWebSocket,
  subscribeToPriceUpdates,
} from "../utils/webSocketUtil";
import { updateAssetPrice } from "../store/assetsSlice";

const PortfolioOverview: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolio = useSelector((state: RootState) => state.assets);

  useEffect(() => {
    if (portfolio.length === 0) return;
    const symbols = portfolio.map((asset) => asset.name);
    console.log("входные данные ", symbols);

    subscribeToPriceUpdates(symbols, (portfolio) => {
      console.log(portfolio);
      const updatedAsset = {
        name: portfolio.s.replace("USDT", ""),
        price: parseFloat(portfolio.c),
        change24h: parseFloat(portfolio.P),
      };
      console.log("выходные данные ", updatedAsset);
      dispatch(updateAssetPrice(updatedAsset));
    });

    return () => {
      closeWebSocket();
    };
  }, [dispatch, portfolio]);

  console.log("1 portfolio:", portfolio);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfolio Overview</h1>
        <button onClick={() => setIsModalOpen(true)}>Добавить</button>
      </header>
      <main>
        <ActiveTable portfolio={portfolio} />
      </main>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PortfolioOverview;
