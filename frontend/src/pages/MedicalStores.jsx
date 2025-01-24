import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const MedicalStores = () => {
  const [stores, setStores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'store_id', label: 'Store ID' },
    { key: 'store_name', label: 'Store Name' },
    { key: 'store_location', label: 'Location' },
  ];

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('medicalstores');
      setStores(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const storeData = Object.fromEntries(formData);

    try {
      if (currentStore) {
        await apiFetch(`medicalstores/${currentStore.store_id}`, {
          method: 'PUT',
          body: JSON.stringify(storeData),
        });
      } else {
        await apiFetch('medicalstores', {
          method: 'POST',
          body: JSON.stringify(storeData),
        });
      }
      setIsModalOpen(false);
      fetchStores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Medical Stores</h1>
        <Button onClick={() => {
          setCurrentStore(null);
          setIsModalOpen(true);
        }}>
          Add Store
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...<br />Please, wait for sometime because the database is hosted on a free server and it takes time to wake up.</p>
      ) : (
      <Table
        columns={columns}
        data={stores}
        onEdit={(store) => {
          setCurrentStore(store);
          setIsModalOpen(true);
        }}
        onDelete={async (store) => {
          if (window.confirm('Delete this store?')) {
            await apiFetch(`medicalstores/${store.store_id}`, { method: 'DELETE' });
            fetchStores();
          }
        }}
      />
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold">{currentStore ? 'Edit' : 'Add'} Store</h2>
          <div className="space-y-2">
            <div>
              <label>Store Name</label>
              <Input name="store_name" defaultValue={currentStore?.store_name} required />
            </div>
            <div>
              <label>Location</label>
              <Input name="store_location" defaultValue={currentStore?.store_location} required />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{currentStore ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
