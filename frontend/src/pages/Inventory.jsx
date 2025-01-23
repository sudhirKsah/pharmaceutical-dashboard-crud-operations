import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'inventory_id', label: 'Inventory ID' },
    { key: 'medicine_id', label: 'Medicine ID' },
    { key: 'medicine_name', label: 'Medicine Name' },
    { key: 'quantity_in_stock', label: 'Quantity' },
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('inventory');
      setInventory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inventoryData = Object.fromEntries(formData);

    try {
      if (currentItem) {
        await apiFetch(`inventory/${currentItem.inventory_id}`, {
          method: 'PUT',
          body: JSON.stringify(inventoryData),
        });
      } else {
        await apiFetch('inventory', {
          method: 'POST',
          body: JSON.stringify(inventoryData),
        });
      }
      setIsModalOpen(false);
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Inventory</h1>
        <Button onClick={() => {
          setCurrentItem(null);
          setIsModalOpen(true);
        }}>
          Add Inventory
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
      <Table
        columns={columns}
        data={inventory}
        onEdit={(item) => {
          setCurrentItem(item);
          setIsModalOpen(true);
        }}
        onDelete={async (item) => {
          if (window.confirm('Delete this inventory item?')) {
            await apiFetch(`inventory/${item.inventory_id}`, { method: 'DELETE' });
            fetchInventory();
          }
        }}
      />
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold">{currentItem ? 'Edit' : 'Add'} Inventory</h2>
          <div className="space-y-2">
            <div>
              <label>Medicine ID</label>
              <Input name="medicine_id" defaultValue={currentItem?.medicine_id} required />
            </div>
            <div>
              <label>Quantity</label>
              <Input name="quantity_in_stock" type="number" defaultValue={currentItem?.quantity_in_stock} required />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{currentItem ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
