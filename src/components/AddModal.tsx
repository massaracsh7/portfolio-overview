import { useEffect, useState } from "react";
import { getAssetsData } from "../utils/getAssetsData";
import { AssetInfo } from "../types/types";

interface AddModalProps {
    onClose: () => void;
  }
  
  const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
    const [currencies, setCurrencies] = useState<AssetInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadCurrencies = async () => {
        setIsLoading(true);
        try {
          const data = await getAssetsData();
          setCurrencies(data);
        } catch (error) {
        
          setError(`Ошибка при загрузке валют. ${error}`);
        } finally {
          setIsLoading(false);
        }
      };
  
      loadCurrencies();
    }, []);
  
    console.log(currencies);
    return (
      <div>
        <h2>Выберите валюту</h2>
        {isLoading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}
        <ul>
          {currencies.length > 0 ? (
            currencies.map((currency) => (
              <li key={currency.id}>{currency.symbol} - {currency.price} - {currency.change}</li>
            ))
          ) : (
            <p>Нет доступных валют.</p>
          )}
        </ul>
        <button onClick={onClose}>Отмена</button>
      </div>
    );
  };
  
  export default AddModal;