import { useEffect, useState } from "react";
import { getAssetsData } from "../utils/getAssetsData";
import { Asset, AssetInfo } from "../types/types";
import { useDispatch } from "react-redux";
import { addAsset } from "../store/assetsSlice";
import styles from "./AddModal.module.scss";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState<AssetInfo[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<AssetInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState<AssetInfo | null>(
    null
  );
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
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Выберите валюту</h2>

        {isLoading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Поиск валюты"
          className="search-input"
        />

        <ul className={styles.currencyList}>
          {!isLoading && !error && filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((currency) => (
              <li
                key={currency.id}
                onClick={() => handleSelectCurrency(currency)}
              >
                {currency.symbol} - {currency.price} - {currency.change}
              </li>
            ))
          ) : !isLoading && !error ? (
            <p>Нет такой валюты.</p>
          ) : null}
        </ul>

        {selectedCurrency && (
          <div>
            <h3>Добавить {selectedCurrency.symbol}</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0"
            />
            <button onClick={handleAddAsset}>Добавить</button>
            <button
              onClick={() => {
                setSelectedCurrency(null);
                onClose();
              }}
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddModal;
