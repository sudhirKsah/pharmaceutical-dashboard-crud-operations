import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const Sales = () => {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'sale_id', label: 'Sale ID' },
    { key: 'medicine_name', label: 'Medicine Name' },
    { key: 'store_name', label: 'Store Name' },
    { key: 'quantity_sold', label: 'Quantity Supplied' },
    { key: 'sale_date', label: 'Sale Date' },
  ];

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('supplies');
      setSupplies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales (Supplies)</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...<br />Please, wait for sometime because the database is hosted on a free server and it takes time to wake up.</p>
      ) : (
      <Table columns={columns} data={supplies} />
      )}
    </div>
  );
};
