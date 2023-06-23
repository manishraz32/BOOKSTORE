import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth';

const Header = () => {

    const [auth, setAuth] = useAuth();
    console.log("auth", auth);

    const handleLogout = () => {
        setAuth({ user: null });
        localStorage.removeItem("auth");
    }

    return (
        <nav className="bg-blue-500 h-[50px] flex justify-end items-center sticky top-0">
            <ul className="flex justify-center space-x-4">
                <li>
                    <Link
                        to="/"
                        className="text-white hover:text-gray-300 px-4 py-2"
                        activeClassName="font-bold"
                    >
                        Home
                    </Link>
                </li>
                {
                    auth.user ? (
                        <>
                            <li>
                                <Link
                                    to="#"
                                    className="text-white hover:text-gray-300 px-4 py-2"
                                    activeClassName="font-bold"
                                >
                                    {auth?.user.name}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-white hover:text-gray-300 px-4 py-2"
                                    activeClassName="font-bold"
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/orders"
                                    className="text-white hover:text-gray-300 px-4 py-2"
                                    activeClassName="font-bold"
                                >
                                    Orders
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/register"
                                    className="text-white hover:text-gray-300 px-4 py-2"
                                    activeClassName="font-bold"
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Login"
                                    className="text-white hover:text-gray-300 px-4 py-2"
                                    activeClassName="font-bold"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>

    )
}

export default Header;