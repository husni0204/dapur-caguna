import LayoutAdmin from '../../../layouts/Admin';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AparatursEdit = () => {
    document.title = 'Aparatur Edit - RW30 Digital';
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErros] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataAparatur = async () => {
        try {
            setLoading(true);
            await Api.get(`/api/admin/aparaturs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setName(response.data.data.name);
                setRole(response.data.data.role);
                setLoading(false);
            });
        } catch (error) {
            setErros(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAparatur();
        setLoading(false);
    }, []);

    const updateAparatur = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('role', role);
        formData.append('_method', 'PUT');

        try {
            setLoading(true);
            await Api.post(`/api/admin/aparaturs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/admin/aparaturs');
                setLoading(false);
            });
        } catch (error) {
            setErros(error.response.data);
            setLoading(false);
        }
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/admin/aparaturs" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil"></i> Create Aparatur
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateAparatur}>
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
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Full Name"
                                            />
                                        </div>
                                        {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Role</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                placeholder="Enter Role Name"
                                            />
                                        </div>
                                        {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
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

export default AparatursEdit;
