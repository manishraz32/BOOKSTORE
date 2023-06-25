import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Layout from '../Layout/Layout'

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // format date time
  //2023-06-22 18:50:15.000000
  const dateTimeForServer = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear()
    const month = date.getMonth() + 1 
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000000`;
  }


  const handleDateRange = async () => {
    console.log(dateTimeForServer(startDate))
    try {
      const startDateTime = dateTimeForServer(startDate);
      const endDateTime = dateTimeForServer(endDate);

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/search-order/by-date-range?startDate=${startDateTime}&endDate=${endDateTime}`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error while handling date range", error);
    }
  }

  const searchOrderByBookName = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/search-order/by-book-name/${searchTerm}`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error while searching order by book name", error);
    }
  };

  const getLatestOrderFirst = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/sort-orders/latest-first`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error in fetching all orders", error);
    }
  }

  useEffect(() => {
    getLatestOrderFirst()
    console.log(orders);
  }, [])

  const formatDateTime = (datetime) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };

    const formattedDateTime = new Date(datetime).toLocaleString('en-US', options);
    return formattedDateTime;
  };

  // sort order from min price to max price 
  const minToMaxPrice = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/sort-orders/price-inc`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error in sort order from min Price to max Price", error);
    }
  }

  // sort order from max Price to Min Price
  const maxToMinPrice = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/sort-orders/price-desc`);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error in sort order from max Price to min Price", error);
    }
  }

  // sort order by date, oldest order first 
  const getOldestOrderFirst = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/sort-orders/oldest-first`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error in sorting, oldest order first", error);
    }
  }

  // Search orders on the basis of price range
  const searchOrderByPriceRange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/search-order/by-price-range?startPrice=${startPrice}&endPrice=${endPrice}`);
      console.log(data);
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log("error while searching order by price range", error);
    }
  }


  return (
    <Layout>
      <div className="flex flex-row place-content-evenly mt-16">
        <div className="left bg-slate-100 w-52">
          <div className="my-5">
            <p className="text-black text-2xl">Sort Order</p>
            <button
              className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => minToMaxPrice()}
            >
              minPrice to MaxPrice
            </button>
            <button
              className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => maxToMinPrice()}
            >
              MaxPrice to minPrice
            </button>
            <button
              className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => getLatestOrderFirst()}
            >
              Latest Order First
            </button>
            <button
              className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => getOldestOrderFirst()}
            >
              Oldest Order First
            </button>
          </div>
          <div className="mt-5">
            <h1 className="text-black text-2xl">Search Order</h1>
            {/* price range */}
            <h1> By price range</h1>
            <div className="form container ml-1 my-2">
              <form
                onSubmit={(e) => searchOrderByPriceRange(e)}
              >
                <input
                  type="text"
                  placeholder="₹ Min"
                  className="w-16 rounded-sm px-2 py-1 border-2 border-blue-500"
                  onChange={(e) => setStartPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="₹ Max"
                  className="w-16 mx-2 rounded-sm px-2 py-1 border-2 border-blue-500"
                  onChange={(e) => setEndPrice(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-10 rounded-sm px-1 py-0 border-2 border-blue-500"
                >
                  Go
                </button>
              </form>
            </div>

            {/* search by date range */}
            <h1 className="mt-4 mb-2"> By Date range</h1>
            <div className="flex flex-col justify-center">
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-blue-500 rounded-md mr-2"
                placeholderText="Start Date"
              />
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-blue-500 rounded-md mr-2 mt-1 mb-2"
                placeholderText="End Date"
              />
              <button
                onClick={() => handleDateRange()}
                className="p-2 border bg-blue-100 border-blue-500 rounded-md mr-2 hover:bg-blue-200"
              >
                Go
              </button>
            </div>

          </div>
        </div>
        <div className="right w-3/4">
          <div className="w-full flex  bg-slate-100 flex-row justify-center m-2 ">
            <form className="flex items-center" onSubmit={(e) => searchOrderByBookName(e)}>
              <input
                type="text"
                placeholder="Search"
                className="px-96 py-2 border bg-slate-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          {/* showing all orders */}
          {
            orders && orders.map((order) => (
              <div className='bg-slate-100 flex flex-row place-content-evenly h-32 pt-5 mt-10 shadow-md'>
                <img src={order.photo}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <div className="w-56 flex justify-start">
                  <h4>{order.title}</h4>
                </div>
                <div className="w-20 flex justify-center">
                  <h4>₹ {order.price}</h4>
                </div>
                <div>
                  <h4 className="text-blue-600">Order Placed successfully at</h4>
                  <h4>{formatDateTime(order.order_date)}</h4>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default Orders