import { useState, useEffect } from 'react';
import LayoutWeb from '../../../layouts/Web';
import Api from '../../../services/Api';
import AlertDataEmpty from '../../../components/general/AlertDataEmpty';
import Loading from '../../../components/general/Loading';
import CardProduct from '../../../components/general/CardProduct';
import Pagination from '../../../components/general/Pagination';

const WebProductsIndex = () => {
    document.title = 'Manu Dapur Caguna';

    const [products, setProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const fetchDataProducts = async (pageNumber = 1) => {
        setLoadingProduct(true);
        const page = pageNumber ? pageNumber : pagination.currentPage;
        try {
            await Api.get(`/api/public/products?page=${page}`).then((response) => {
                setProducts(response.data.data.data);
                setPagination(() => ({
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total,
                }));
                setLoadingProduct(false);
            });
        } catch (error) {
            return error.message;
        }
    };

    useEffect(() => {
        fetchDataProducts();
    }, []);

    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i className="fa fa-shopping-bag"></i> DAFTAR MENU
                        </h5>
                        <hr />
                    </div>
                </div>
                <div className="row mt-4">
                    {loadingProduct ? (
                        <Loading />
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <CardProduct
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                slug={product.slug}
                                price={product.price}
                                phone={product.phone}
                            />
                        ))
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
                <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchDataProducts(pageNumber)}
                    position="center"
                />
            </div>
        </LayoutWeb>
    );
};

export default WebProductsIndex;
