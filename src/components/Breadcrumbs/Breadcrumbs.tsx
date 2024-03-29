import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Product } from '../../helpers/types/Product';
import { useGetProductsQuery } from '../../helpers/api/productsApi';
import { capitalize } from '../../helpers/utils/capitalize';

import './Breadcrumbs.scss';

import iconHome from '../../helpers/icons/icon_home.svg';
import iconVector from '../../helpers/icons/icon_vector_disabled.svg';

export const Breadcrumbs = () => {
  const [path, setPath] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product>();

  const location = useLocation();
  const { productId } = useParams();

  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (products && productId) {
      setCurrentProduct(products
        .find(product => product.phoneId === productId));
    }
  }, [productId, products]);

  useEffect(() => {
    if (!productId) {
      setPath(location.pathname.slice(1, location.pathname.length));
    } else if (currentProduct) {
      setPath(currentProduct.category);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, currentProduct]);

  return (
    <div data-cy="breadCrumbs" className="Breadcrumbs">
      <Link to="/" className="Breadcrumbs__link">
        <img
          src={iconHome}
          alt="Home Icon"
        />
      </Link>

      <img
        src={iconVector}
        alt="Vector Icon"
      />

      {productId ? (
        <>
          <Link to={`/${path}`} className="Breadcrumbs__link">
            <p className="Breadcrumbs__folder">{capitalize(path)}</p>
          </Link>

          <img
            src={iconVector}
            alt="Vector Icon"
          />

          <p className="Breadcrumbs__folder">{currentProduct?.name}</p>
        </>
      ) : (
        <p className="Breadcrumbs__folder">{capitalize(path)}</p>
      )}
    </div>
  );
};
