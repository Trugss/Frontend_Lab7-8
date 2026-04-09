import { createContext, useState, useContext, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await inventoryApi.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Помилка завантаження інвентарю:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ items, setItems, loading, fetchItems }}>
      {children}
    </InventoryContext.Provider>
  );
};