import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { fetchProductList, fetchProductListFail, fetchProductListSuccess } from '../redux/slices/productListSlice';

const ProductList = () => {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.productList)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductList());
      try {
       const res = await axios.get('https://fakestoreapi.com/products/')
        dispatch(
          fetchProductListSuccess({
            data: res.data
          })
        )
      } catch (error) {
        dispatch(fetchProductListFail({
          error: error.message
        }))
      }
    }
    fetchData();
  }, [dispatch])

  const handleSearch = () => {
    return data
    .slice((page -1)*10, (page-1)*10 + 10)
    .filter((product) =>
      product.title.toLowerCase().includes(search) &&
      (category ? product.category === category : true)
    );
  };
  


  if(loading) {
    return <div><h1>Loading...</h1></div>
  }

  if (error) {
    return <div><h1>{error.message}</h1></div>
  }
  

  return (
    <div>
        <div className='w-100 p-4'>
            <select 
            name="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">filter</option>
                <option value="men's clothing">Mens clothing</option>
                <option value="jewelery">jewellary</option>
                <option value="women's clothing">women's clothing</option>
                <option value="electronics">electronics</option>
            </select> &nbsp; &nbsp;
            <input 
            type="text" 
            placeholder='search for products...' 
            className='border-b-2 focus:border-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
             />
        </div>
        <div className='flex flex-wrap p-10 gap-6'>
          {handleSearch()
          .map((product, id) => {
            return (
            <ProductCard key={id} product={product}/>
            )
          })}
            
        </div>
        <div className='flex justify-center mb-4'>
          <p onClick={() => page !== 1 && setPage(page-1)} className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium bg-blue-500 text-white rounded-md cursor-pointer">
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
            Previous
          </p>
          <p onClick={() => page !== 2 && setPage(page+1)} className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md cursor-pointer">
            Next
            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </p>
        </div>
    </div>
  )
}

export default ProductList