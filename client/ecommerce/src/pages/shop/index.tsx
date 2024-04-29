import {useGetProducts} from '../../hooks/useGetProducts'
export const ShopPage = () => {
    const {products} = useGetProducts();
    return (
      
    <>
          <div>
                {products.map(product => (<div>{product}</div>))}
      </div>
    </>
  );
};
