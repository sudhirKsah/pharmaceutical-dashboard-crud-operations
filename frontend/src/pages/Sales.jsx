import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const Sales = () => {
  const [supplies, setSupplies] = useState([]);

  const columns = [
    { key: 'sale_id', label: 'Supply ID' },
    { key: 'medicine_name', label: 'Medicine Name' },
    { key: 'store_name', label: 'Store Name' },
    { key: 'quantity_sold', label: 'Quantity Supplied' },
    { key: 'sale_date', label: 'Sale Date' },
  ];

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = async () => {
    try {
      const data = await apiFetch('supplies');
      setSupplies(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Supplies (Sales)</h1>
      <Table columns={columns} data={supplies} />
    </div>
  );
};
