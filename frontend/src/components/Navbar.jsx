import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Check if user is logged in

    return (
        <nav className="bg-green-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <Link to="/" className="text-2xl text-white font-bold">
                            Pharma <span className="text-red-500 text-[50px] -ml-5">+</span>
                        </Link>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <div className="flex space-x-4">
                            {!isLoggedIn ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-white bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-md text-sm font-medium px-3 py-2"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-medium px-3 py-2"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false); // Update state to re-render the component
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsLoggedIn(Boolean(token)); // Re-check login status
//     }, []);

//     return (
//         <nav className="bg-green-500">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div>
//                         <Link to="/" className="text-2xl text-white font-bold">
//                             Pharma <span className="text-red-500 text-[50px] -ml-5">+</span>
//                         </Link>
//                     </div>
//                     <div className="ml-4 flex items-center md:ml-6">
//                         <div className="flex space-x-4">
//                             {!isLoggedIn ? (
//                                 <>
//                                     <Link
//                                         to="/login"
//                                         className="text-white bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium"
//                                     >
//                                         Login
//                                     </Link>
//                                     <Link
//                                         to="/register"
//                                         className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-md text-sm font-medium px-3 py-2"
//                                     >
//                                         Register
//                                     </Link>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link
//                                         to="/dashboard"
//                                         className="text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-medium px-3 py-2"
//                                     >
//                                         Dashboard
//                                     </Link>
//                                     <button
//                                         onClick={handleLogout}
//                                         className="text-white bg-red-700 hover:bg-red-800 rounded-md text-sm font-medium px-3 py-2"
//                                     >
//                                         Logout
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;