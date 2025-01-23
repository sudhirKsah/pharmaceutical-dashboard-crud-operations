import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { apiFetch } from '../utils/api';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'order_id', label: 'Order ID' },
    { key: 'store_id', label: 'Store ID' },
    { key: 'store_name', label: 'Store Name' },
    { key: 'medicine_id', label: 'Medicine ID' },
    { key: 'medicine_name', label: 'Medicine Name' },
    { key: 'quantity_ordered', label: 'Quantity' },
    { key: 'order_date', label: 'Order Date' },
    { key: 'order_status', label: 'Status' },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('orders');
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = Object.fromEntries(formData);

    try {
      if (currentOrder) {
        await apiFetch(`orders/${currentOrder.order_id}`, {
          method: 'PUT',
          body: JSON.stringify(orderData),
        });
      } else {
        await apiFetch('orders', {
          method: 'POST',
          body: JSON.stringify(orderData),
        });
      }
      setIsModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Orders</h1>
        <Button onClick={() => {
          setCurrentOrder(null);
          setIsModalOpen(true);
        }}>
          Add Order
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
      <Table
        columns={columns}
        data={orders}
        onEdit={(order) => {
          setCurrentOrder(order);
          setIsModalOpen(true);
        }}
        onDelete={async (order) => {
          if (window.confirm('Delete this order?')) {
            await apiFetch(`orders/${order.order_id}`, { method: 'DELETE' });
            fetchOrders();
          }
        }}
      />
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold">{currentOrder ? 'Edit' : 'Add'} Order</h2>
          <div className="space-y-2">
            <div>
              <label>Store ID</label>
              <Input name="store_id" defaultValue={currentOrder?.store_id} required />
            </div>
            <div>
              <label>Medicine ID</label>
              <Input name="medicine_id" defaultValue={currentOrder?.medicine_id} required />
            </div>
            <div>
              <label>Quantity</label>
              <Input name="quantity_ordered" type="number" defaultValue={currentOrder?.quantity_ordered} required />
            </div>
            <div>
              <label>Order Date</label>
              <Input name="order_date" type="date" defaultValue={currentOrder?.order_date} required />
            </div>
            <div>
              <label>Status</label>
              <Input name="order_status" placeholder='Pending or Fulfilled or Cancelled' defaultValue={currentOrder?.order_status} required />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{currentOrder ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
