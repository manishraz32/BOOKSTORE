import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth';
import Layout from '../Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [auth, setAuth] = useAuth();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if(e.target.value.trim() === "") {
      getBooks()
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/books/search/${searchTerm.trim()}`);
      if (data && data?.success) {
        console.log(data.books);
        setBooks(data.books);
      } else {
        alert("book not found");
        console.log("books not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/books`);
      if (data && data?.success) {
        console.log(data.books);
        setBooks(data.books);
      } else {
        alert("book not found");
        console.log("books not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks();
    console.log("books", books);
  }, []);

  const handleClick = async (id) => {
    if (!auth.user) {
      alert("please Login First");
      return;
    }
    try {
      const order = { customer_ID: auth.user._id, book_ID: id, order_date: new Date() };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/orders/add-order`,
          order
        );
      if (res && res?.data?.success) {
        navigate('/orders')
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error while adding error", error);
    }
  }

  return (
    <Layout>
      {/* search box */}
      <div className="w-full flex flex-row justify-center m-2 ">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* book container */}
      <h2 className="text-center">Total books available is: {books != null ? books.length : 0}</h2>
      <div className="flex flex-row flex-wrap content-between ml-20">
        {
          books && books.map((book) => (
            <div key={book.id} className="bg-slate-200 rounded-lg shadow-lg m-5 w-[300px] flex flex-col items-center justify-center">
              <img src={book.photo} alt={book.title} className=" w-[250px] h-[200px] object-contain" />
              <div className="p-2 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-800 ">{book.description}</p>
                <p className="text-lg font-semibold ">{book.price}</p>
                <button
                  className="bg-blue-500 w-[250px] hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleClick(book.id)}
                >
                  Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export default HomePage