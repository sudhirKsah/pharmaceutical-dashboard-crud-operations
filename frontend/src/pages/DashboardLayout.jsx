import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {
        // localStorage.removeItem('token'); 
        logout();
        navigate('/login'); 
    };

    return (
        <div className="flex">
            <div className={`bg-white shadow-lg transition-all ${isCollapsed ? 'w-16' : 'w-64'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {!isCollapsed && <h1 className="text-xl font-bold">Pharmacy</h1>}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        =
                    </button>
                </div>

                {/* Sidebar */}
                {!isCollapsed && (
                    <aside
                        className={`${isCollapsed ? 'block' : ''} bg-gray-800 text-white w-64 h-screen p-4`}
                    >
                        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                        <nav className="space-y-4">
                            <NavLink
                                to="/dashboard/medicines"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-700 px-3 py-2 rounded-md block'
                                        : 'hover:bg-gray-700 px-3 py-2 rounded-md block'
                                }
                            >
                                Medicines
                            </NavLink>
                            <NavLink
                                to="/dashboard/stores"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-700 px-3 py-2 rounded-md block'
                                        : 'hover:bg-gray-700 px-3 py-2 rounded-md block'
                                }
                            >
                                Stores
                            </NavLink>
                            <NavLink
                                to="/dashboard/sales"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-700 px-3 py-2 rounded-md block'
                                        : 'hover:bg-gray-700 px-3 py-2 rounded-md block'
                                }
                            >
                                Sales (Supplies)
                            </NavLink>
                            <NavLink
                                to="/dashboard/orders"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-700 px-3 py-2 rounded-md block'
                                        : 'hover:bg-gray-700 px-3 py-2 rounded-md block'
                                }
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                to="/dashboard/inventory"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-700 px-3 py-2 rounded-md block'
                                        : 'hover:bg-gray-700 px-3 py-2 rounded-md block'
                                }
                            >
                                Inventory
                            </NavLink>
                        </nav>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </aside>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
