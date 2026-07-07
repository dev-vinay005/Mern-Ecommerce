import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProduct } from '../../redux/slices/productSlice'
import ProductCard from './ProductCard';

const ProductSection = () => {
    const dispatch = useDispatch()
    const productState = useSelector((state) => {
        return state.productSlice;
    })

    useEffect(() => {
        dispatch(fetchAllProduct({
            category: "",
            page: 1,
            limit: 0,
        }))
    }, [])

    return (
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10" >
            {productState.products.slice(0, 12).map((product) => (
                <>
                    <ProductCard product={product} key={product._id} />
                </>
            ))}
            < div />
        </div>
    )
}

export default ProductSection
