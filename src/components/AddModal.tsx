import { useEffect, useState } from "react";
import { getAssetsData } from "../utils/getAssetsData";
import { Asset, AssetInfo } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addAsset, updateAsset } from "../store/assetsSlice";
import styles from "./AddModal.module.scss";
import { RootState } from "../store/store";
import { FixedSizeList as List } from "react-window";
import { getChangeColor } from "../utils/getChangeColor";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const portfolio = useSelector((state: RootState) => state.assets);
  const [currencies, setCurrencies] = useState<AssetInfo[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<AssetInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState<AssetInfo | null>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const loadCurrencies = async () => {
      setIsLoading(true);
      try {
        const data = await getAssetsData();
        setCurrencies(data);
        setFilteredCurrencies(data);
      } catch (error) {
        setError(`Ошибка при загрузке валют: ${String(error)}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrencies();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredCurrencies(
      currencies.filter((currency) =>
        currency.symbol.toLowerCase().includes(query)
      )
    );
  };

  const handleSelectCurrency = (currency: AssetInfo) => {
    setSelectedCurrency(currency);
    setQuantity(0);
  };

  const handleAddAsset = () => {
    if (!selectedCurrency || quantity <= 0) return;
    const existingAsset = portfolio.find(
      (asset) => asset.name === selectedCurrency.symbol
    );
    if (existingAsset) {
      const updatedAsset = {
        ...existingAsset,
        quantity: existingAsset.quantity + quantity,
      };

      dispatch(updateAsset(updatedAsset));
    } else {
      const newAsset: Asset = {
        id: selectedCurrency.id,
        name: selectedCurrency.symbol,
        quantity,
        price: selectedCurrency.price,
        change24h: 0,
        portfolioShare: 0,
      };

      dispatch(addAsset(newAsset));
      setSelectedCurrency(null);
      setQuantity(0);
    }
  };

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const currency = filteredCurrencies[index];

    const customStyles: React.CSSProperties = {
      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    };

    const combinedStyles = { ...style, ...customStyles };
    return (
      <li
        key={currency.id}
        style={combinedStyles}
        onClick={() => handleSelectCurrency(currency)}
        role="option"
        aria-selected={selectedCurrency?.id === currency.id ? "true" : "false"}
        aria-label={`Выбрать валюту ${currency.symbol}`}
      >
        <span>{currency.symbol} </span> <span>{currency.price}</span>{" "}
        <span style={{ color: getChangeColor(currency.change) }}>
          {currency.change.toFixed(2)}%
        </span>
      </li>
    );
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-labelledby="add-asset"
      aria-hidden={false}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 id="add-asset">Выберите валюту</h2>

        {isLoading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Поиск валюты"
          className={styles.searchInput}
          aria-label="Поиск валюты"
        />

        <div className={styles.currencyList}>
          {!isLoading && !error && filteredCurrencies.length > 0 ? (
            <List
              height={300}
              itemCount={filteredCurrencies.length}
              itemSize={50}
              width="100%"
            >
              {renderRow}
            </List>
          ) : !isLoading && !error ? (
            <p>Нет такой валюты.</p>
          ) : null}
        </div>

        {selectedCurrency && (
          <div>
            <h3>Добавить {selectedCurrency.symbol}</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0"
              className={styles.searchInput}
              aria-label={`Введите количество ${selectedCurrency.symbol}`}
            />
            <div className={styles.modalBottom}>
              <button
                onClick={() => {
                  handleAddAsset();
                  onClose();
                }}
                aria-label="Добавить актив"
              >
                Добавить
              </button>
              <button
                onClick={() => {
                  setSelectedCurrency(null);
                  onClose();
                }}
                aria-label="Отмена добавления"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddModal;
