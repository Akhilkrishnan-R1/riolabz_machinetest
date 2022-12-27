import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const truncateString = (str, num) =>{
    if(str?.length>num) {
      return str.slice(0, num) + '...';
    }else{
      return str;
    }
  }

  return (
    <div 
      className='w-60 h-100 p-3 rounded-lg shadow-slate-500 shadow-md flex flex-col  justify-center'
      onClick={() => navigate(`/product/${product.id}`)}
      >
        <img className='w-32 self-center' src={product?.image} alt="product" />
        <div className='flex flex-col text-right'>
            <h1 className='font-semibold text-lg text-blue-500'>{truncateString(product?.title, 20)}</h1>
            <p>rating: {product.rating?.rate}★ &nbsp; ({product.rating?.count})</p>
            <p className='font-semibold text-lg'>${product?.price}</p>
            <button className='bg-blue-500 text-white p-2 rounded-md'>Add to cart</button>
        </div>
    </div>
  )
}

export default ProductCard