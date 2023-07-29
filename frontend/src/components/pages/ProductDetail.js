import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout/Layout'

const ProductDetail = () => {
    const [book, setBook] = useState([]);
    const [seller, setSeller] = useState("");
    const { book_id } = useParams();


    const getSellerDetail = async (sellerId) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/sellers/${sellerId}`);
            // console.log("seller", data.seller[0]?.name);
            if (data.success) {
                setSeller(data.seller[0]?.name);
            }
        } catch(error) {
            console.log("error while getting seller detail", error);
        }
    } 

    const getBookById = async (id) => {
        try {
            const  { data }  = await axios.get(`${process.env.REACT_APP_API}/api/v1/books/${id}`);
            // console.log("bookDetail", data.book);
            if (data.success) {
                setBook((prvBook) => data.book[0]);
                getSellerDetail(data.book[0]?.seller_ID);
            }
        } catch (error) {
            console.log("error while getting book detail", error);
        }
    }
    
    // console.log("book", book);

    useEffect(() => {
        getBookById(book_id);
        // console.log("book", book);
    }, [])

    return (
        <Layout>
            <div className="w-[100%] flex justify-center bg-slate-200">
                <div className="main-container w-[90%] flex justify-around mt-10 bg-white">
                    <div className="left-container w-[40%]">
                        <div className="w-[90%] h-[450px] flex border border-gray-300 justify-center items-center bg-white mt-[20px]">
                            <div className="w-[250px] h-[350px] overflow-hidden ">
                                <img src={book.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="button-container w-[90%] flex justify-between mt-3">
                            <div className="left-button">
                                <button className="px-[77px] py-[12px] bg-orange-400  text-white rounded-sm hover:cursor-pointer hover:bg-orange-500">ADD TO CART</button>
                            </div>
                            <div className="right-button">
                                <button className="px-[77px] py-[12px] bg-orange-600 text-white rounded-sm hover:cursor-pointer hover:bg-orange-700">BUY NOW</button>
                            </div>
                        </div>
                    </div>
                    <div className="right-container w-[50%]  h-[60vh] bg-white mt-4">
                        <div className="heading-container">
                            <h1 className="text-lg font-semibold">
                                {book.description} ( { book.author } )
                            </h1>
                        </div>
                        <div className="price-container mt-5">
                            <h1 className="text-xl font-bold">
                                ₹{book.price}
                            </h1>
                        </div>
                        <div className="offers mt-5">
                            <h1 className="mb-2">Available offer</h1>
                            <h1><span className="font-semibold">Bank Offer</span> Flat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999</h1>
                            <h1><span className="font-semibold">Bank Offer</span> Bank OfferFlat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999</h1>
                            <h1><span className="font-semibold">Bank Offer</span> Bank OfferFlat ₹4,000 Off on HDFC Bank Credit Card EMI Trxns on orders of ₹50,000 and above</h1>
                            <h1><span className="font-semibold">Bank Offer</span> Buy this product & get ₹500 Off on your next LG Refrigerator purchase</h1>
                        </div>
                        <div>
                            <div className="flex mt-7">
                                <div className="text-gray-500 mr-14">Author </div>
                                <div className="">{book.author}</div>
                            </div>
                            <div className="flex mt-7">
                                <div className="text-gray-500 mr-14">Seller </div>
                                <div className="">
                                    <h1>{seller}</h1>
                                    <h1>7 Days Replacement Policy ?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetail