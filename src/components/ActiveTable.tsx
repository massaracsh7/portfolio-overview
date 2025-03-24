import { useDispatch } from "react-redux";
import { Asset } from "../types/types";
import styles from "./ActiveTable.module.scss";
import { removeAsset } from "../store/assetsSlice";
import { FixedSizeList as List } from "react-window";
import { getChangeColor } from "../utils/getChangeColor";

interface ActiveTableProps {
  portfolio: Asset[];
}

const ActiveTable: React.FC<ActiveTableProps> = ({ portfolio }) => {
  const dispatch = useDispatch();
  const removeItem = (id: string) => {
    dispatch(removeAsset(id));
  };

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const asset = portfolio[index];

    return (
      <div
        style={style}
        key={asset.id}
        role="row"
        aria-labelledby={`asset-${asset.name}`}
      >
        <table className={styles.tableRow}>
          <tbody>
            <tr
              onClick={() => removeItem(asset.id)}
              role="row"
              aria-label={`Удалить актив ${asset.name}`}
            >
              <td role="cell">{asset.name}</td>
              <td role="cell">{asset.quantity}</td>
              <td role="cell">{asset.price}</td>
              <td role="cell">{(asset.quantity * asset.price).toFixed(2)}</td>
              <td
                role="cell"
                style={{ color: getChangeColor(asset.change24h) }}
              >
                {asset.change24h.toFixed(2)}%
              </td>
              <td role="cell">{asset.portfolioShare.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Количество</th>
            <th scope="col">Цена</th>
            <th scope="col">Общая стоимость</th>
            <th scope="col">Изменение за 24ч</th>
            <th scope="col">% портфеля</th>
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
