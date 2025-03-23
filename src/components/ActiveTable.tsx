import { Asset } from "../types/types";
import styles from "./ActiveTable.module.scss";

interface ActiveTableProps {
  portfolio: Asset[]; 
}

const ActiveTable: React.FC<ActiveTableProps> = ({ portfolio }) => {
    console.log(portfolio);
  return (
    <div className={styles.table}>
      <table>
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
        <tbody>
          {portfolio.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.quantity}</td>
              <td>{asset.price}</td>
              <td>{(asset.quantity * asset.price).toFixed(2)}</td>
              <td>{asset.change24h}</td>
              <td>{asset.portfolioShare.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveTable;
