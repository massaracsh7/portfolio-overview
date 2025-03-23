import React, { useEffect, useState } from "react";

import AddModal from "../components/AddModal";
import styles from "./PortfolioOverview.module.scss";
import ActiveTable from "../components/ActiveTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeWebSocket, subscribeToPriceUpdates } from "../utils/webSocketUtil";
import { updateAssetPrice } from "../store/assetsSlice";

const PortfolioOverview: React.FC = () => {
    const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolio = useSelector((state: RootState) => state.assets);
  console.log(portfolio)
  useEffect(() => {
    if (portfolio.length === 0) return;

    const symbols = portfolio.map((asset) => asset.name);
    
    subscribeToPriceUpdates(symbols, (data) => {
      const updatedAsset = {
        id: data.s, 
        price: parseFloat(data.c), 
        change24h: parseFloat(data.P), 
      };

      dispatch(updateAssetPrice(updatedAsset));
    });

    return () => {
      closeWebSocket(); 
    };
  }, [dispatch, portfolio]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfolio Overview</h1>
        <button onClick={() => setIsModalOpen(true)}>Добавить</button>
      </header>
      <main>
        <ActiveTable portfolio={portfolio}/>
      </main>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PortfolioOverview;
