import { useDispatch } from "react-redux";
import { Asset } from "../types/types";
import styles from "./ActiveTable.module.scss";
import { removeAsset } from "../store/assetsSlice";
import { FixedSizeList as List } from 'react-window';

interface ActiveTableProps {
  portfolio: Asset[];
}

const ActiveTable: React.FC<ActiveTableProps> = ({ portfolio }) => {
  const dispatch = useDispatch();
  const removeItem = (id: string) => {
    dispatch(removeAsset(id));
  };

  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const asset = portfolio[index];
    
    return (
      <div style={style} key={asset.id}>
        <table className={styles.tableRow}>
          <tbody>
            <tr onClick={() => removeItem(asset.id)}>
              <td>{asset.name}</td>
              <td>{asset.quantity}</td>
              <td>{asset.price}</td>
              <td>{(asset.quantity * asset.price).toFixed(2)}</td>
              <td>{asset.change24h}</td>
              <td>{asset.portfolioShare.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };


  return (
<div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Общая стоимость</th>
            <th>Изменение за 24ч</th>
            <th>% портфеля</th>
          </tr>
        </thead>
      </table>
      <List
        height={400}
        itemCount={portfolio.length}
        itemSize={50}
        width="100%"
      >
        {renderRow}
      </List>
    </div>
  );
};

export default ActiveTable;
