import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProductDetails, fetchProductDetailsFail, fetchProductDetailsSuccess } from '../redux/slices/productDetailsSlice';


const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.productDetails)

  useEffect(() => {
   const fetchProduct = async () => {
      dispatch(fetchProductDetails());
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        dispatch(fetchProductDetailsSuccess({
        data: response.data,
      }))
      } catch (error) {
        dispatch(fetchProductDetailsFail({
          error: error.message
        }))
      }
   } 
   fetchProduct();
  }, [dispatch, id])

  if (loading) {
    return <div><h1>Loading...</h1></div>
  }

  if(error){
    return <div><h1>{error.message}</h1></div>
  }
  
  return (
    <div className='flex p-20 justify-between'>
        <div className='w-[40%] p-20'>
            <img src={data.image} alt="" />
        </div>
        <div className='justify-end p-20'>
            <h1 className='text-3xl font-semibold'>{data?.title}</h1>
            <p>rating: {data.rating?.rate}★ &nbsp; ({data.rating?.count})</p>
            <br /><br />
            <p className='font-semibold text-xl'> ${data?.price}</p>
            <p className='break-all'>{data?.description}</p>
            <p>Category : {data?.category}</p>
            <br />
            <button className='bg-blue-500 text-white p-3 rounded-md '>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductDetails