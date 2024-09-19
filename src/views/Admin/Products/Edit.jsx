import LayoutAdmin from '../../../layouts/Admin';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductsEdit = () => {
    document.title = 'Products Edit - RW30 Digital';
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [owner, setOwner] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErros] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataProducts = async () => {
        try {
            setLoading(true);
            await Api.get(`/api/admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setTitle(response.data.data.title);
                setContent(response.data.data.content);
                setOwner(response.data.data.owner);
                setPrice(response.data.data.price);
                setAddress(response.data.data.address);
                setPhone(response.data.data.phone);
            });
        } catch (error) {
            return error.message, setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataProducts();
        setLoading(false);
    }, []);

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('owner', owner);
        formData.append('price', price);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('content', content);
        formData.append('_method', 'PUT');

        try {
            setLoading(true);
            await Api.post(`/api/admin/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/admin/products');
                setLoading(false);
            });
        } catch (error) {
            setErros(error.message);
            setLoading(false);
        }
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/admin/products" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil-alt"></i> Edit Product
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateProduct}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </div>
                                        {errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Enter Title Product"
                                                    />
                                                </div>
                                                {errors.title && <div className="alert alert-danger">{errors.title[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Phone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="Enter Phone"
                                                    />
                                                </div>
                                                {errors.phone && <div className="alert alert-danger">{errors.phone[0]}</div>}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Content</label>
                                            <ReactQuill theme="snow" rows="5" value={content} onChange={(content) => setContent(content)} />
                                        </div>
                                        {errors.content && <div className="alert alert-danger">{errors.content[0]}</div>}

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Owner</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={owner}
                                                        onChange={(e) => setOwner(e.target.value)}
                                                        placeholder="Enter Owner Product"
                                                    />
                                                </div>
                                                {errors.owner && <div className="alert alert-danger">{errors.owner[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Price</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        placeholder="Enter Price Product"
                                                    />
                                                </div>
                                                {errors.price && <div className="alert alert-danger">{errors.price[0]}</div>}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Address</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Enter Address"
                                            ></textarea>
                                        </div>
                                        {errors.address && <div className="alert alert-danger">{errors.address[0]}</div>}

                                        <div>
                                            {loading ? (
                                                <button type="button" disabled className="btn btn-tertiary me-2">
                                                    <i className="fa fa-save"></i>&nbsp;Loading ...
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-md btn-primary me-2">
                                                    <i className="fa fa-save"></i> Save
                                                </button>
                                            )}
                                            <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
};

export default ProductsEdit;
