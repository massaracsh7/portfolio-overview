import { useEffect, useState } from "react";
import { getAssetsData } from "../utils/getAssetsData";
import { Asset, AssetInfo } from "../types/types";
import { useDispatch } from "react-redux";
import { addAsset } from "../store/assetsSlice";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState<AssetInfo[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<AssetInfo[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<AssetInfo | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const handleAssets = (item: AssetInfo) => {
    const newAsset: Asset = {
        id: item.id,
        name: item.symbol, 
        quantity: 0,
        price: item.price,
        change24h: 0,
        portfolioShare: 0,
      };
    
      dispatch(addAsset(newAsset));
  };

  return (
    <div>
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

      <ul>
        {!isLoading && !error && filteredCurrencies.length > 0 ? (
          filteredCurrencies.map((currency) => (
            <li key={currency.id} onClick={() => handleAssets(currency)}>
              {currency.symbol} - {currency.price} - {currency.change}
            </li>
          ))
        ) : !isLoading && !error ? (
          <p>Нет такой валюты.</p>
        ) : null}
      </ul>

      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default AddModal;
