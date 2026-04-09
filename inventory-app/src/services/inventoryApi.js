const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMockData = () => {
  const data = localStorage.getItem('mock_inventory');
  if (data) return JSON.parse(data);
  
  const initialData = [
    { 
      id: '1', 
      inventory_name: 'Стелаж металевий', 
      description: 'Стелаж для зберігання важких деталей, 5 полиць.', 
      photoUrl: '/images/322986817.png' 
    },
    { 
      id: '2', 
      inventory_name: 'Гідравлічний візок', 
      description: 'Вантажопідйомність 2 тонни.', 
      photoUrl: '/images/cby-jc-1_420x320_630.png' 
    },
    { 
      id: '3', 
      inventory_name: 'Пакувальна плівка', 
      description: 'Стретч-плівка прозора, 500мм.', 
      photoUrl: '/images/71V81XTlYLL.__AC_SX300_SY300_QL70_ML2_-1000x1000.png' 
    },
  ];
  localStorage.setItem('mock_inventory', JSON.stringify(initialData));
  return initialData;
};

const saveMockData = (data) => {
  localStorage.setItem('mock_inventory', JSON.stringify(data));
};

export const inventoryApi = {
  getAll: async () => {
    await delay(400); 
    return { data: getMockData() };
  },
  
  getById: async (id) => {
    await delay(200);
    const item = getMockData().find(i => i.id === String(id));
    if (!item) throw new Error('Item not found');
    return { data: item };
  },
  
  create: async (formData) => {
    await delay(500);
    const items = getMockData();
    const photo = formData.get('photo');
    
    const newItem = {
      id: Date.now().toString(), 
      inventory_name: formData.get('inventory_name'),
      description: formData.get('description'),
      photoUrl: photo ? URL.createObjectURL(photo) : null 
    };
    
    saveMockData([...items, newItem]);
    return { data: newItem };
  },
  
  updateText: async (id, data) => {
    await delay(400);
    const items = getMockData();
    const index = items.findIndex(i => i.id === String(id));
    if (index === -1) throw new Error('Item not found');
    
    items[index] = { ...items[index], ...data };
    saveMockData(items);
    return { data: items[index] };
  },
  
  updatePhoto: async (id, formData) => {
    await delay(500);
    const items = getMockData();
    const index = items.findIndex(i => i.id === String(id));
    if (index === -1) throw new Error('Item not found');
    
    const photo = formData.get('photo');
    if (photo) {
      items[index].photoUrl = URL.createObjectURL(photo);
      saveMockData(items);
    }
    return { data: items[index] };
  },
  
  delete: async (id) => {
    await delay(300);
    const items = getMockData();
    saveMockData(items.filter(i => i.id !== String(id)));
    return { data: { success: true } };
  }
};