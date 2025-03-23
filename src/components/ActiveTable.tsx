import { useDispatch } from "react-redux";
import { Asset } from "../types/types";
import styles from "./ActiveTable.module.scss";
import { removeAsset } from "../store/assetsSlice";

interface ActiveTableProps {
  portfolio: Asset[];
}

const ActiveTable: React.FC<ActiveTableProps> = ({ portfolio }) => {
    console.log("Received portfolio:", portfolio);
  const dispatch = useDispatch();
  const removeItem = (id: string) => {
    dispatch(removeAsset(id));
  }
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
            <tr key={asset.id} onClick={() => removeItem(asset.id)}>
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
