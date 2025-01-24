import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'medicine_id', label: 'Medicine ID' },
    { key: 'medicine_name', label: 'Medicine Name' },
    { key: 'manufacture_date', label: 'Manufacture Date' },
    { key: 'expiry_date', label: 'Expiry Date' },
    { key: 'price', label: 'Price' },
  ];

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('medicines');
      setMedicines(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const medicineData = Object.fromEntries(formData);

    try {
      if (currentMedicine) {
        await apiFetch(`medicines/${currentMedicine.medicine_id}`, {
          method: 'PUT',
          body: JSON.stringify(medicineData),
        });
      } else {
        await apiFetch('medicines', {
          method: 'POST',
          body: JSON.stringify(medicineData),
        });
      }
      setIsModalOpen(false);
      fetchMedicines();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Medicines</h1>
        <Button onClick={() => {
          setCurrentMedicine(null);
          setIsModalOpen(true);
        }}>
          Add Medicine
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...<br />Please, wait for sometime because the database is hosted on a free server and it takes time to wake up.</p>
      ) : (
        <Table
          columns={columns}
          data={medicines}
          onEdit={(medicine) => {
            setCurrentMedicine(medicine);
            setIsModalOpen(true);
          }}
          onDelete={async (medicine) => {
            if (window.confirm('Delete this medicine?')) {
              await apiFetch(`medicines/${medicine.medicine_id}`, { method: 'DELETE' });
              fetchMedicines();
            }
          }}
        />
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold">{currentMedicine ? 'Edit' : 'Add'} Medicine</h2>
          <div className="space-y-2">
            <div>
              <label>Medicine Name</label>
              <Input name="medicine_name" defaultValue={currentMedicine?.medicine_name} required />
            </div>
            <div>
              <label>Manufacture Date</label>
              <Input name="manufacture_date" type='date' defaultValue={currentMedicine?.manufacture_date} required />
            </div>
            <div>
              <label>Expiry Date</label>
              <Input name="expiry_date" type='date' defaultValue={currentMedicine?.expiry_date} required />
            </div>
            <div>
              <label>Price</label>
              <Input type="number" name="price" defaultValue={currentMedicine?.price} required />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{currentMedicine ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Medicines;
