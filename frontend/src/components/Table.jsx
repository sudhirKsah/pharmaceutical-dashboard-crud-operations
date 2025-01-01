import React from 'react';

export const Table = ({ columns, data, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((column) => (
            <th key={column.key} className="p-4 border text-left">
              {column.label}
            </th>
          ))}
          <th className="p-4 border text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {columns.map((column) => (
              <td key={column.key} className="p-4 border">
                {column.format ? column.format(row[column.key]) : row[column.key]}
              </td>
            ))}
            <td className="p-4 border">
              <div className="flex gap-2">
                <button onClick={() => onEdit(row)} className="text-blue-500">Edit</button>
                <button onClick={() => onDelete(row)} className="text-red-500">Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
