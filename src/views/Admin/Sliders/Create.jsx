import { useState } from 'react';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const SlidersCreate = (props) => {
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const storeSlider = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            setLoading(true);
            await Api.post('/api/admin/sliders', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                document.getElementById('file').value = '';
                props.fetchData();
                setLoading(false);
            });
        } catch (error) {
            setErrors(error.response.data.errors);
            console.log('ini errornya :', error.response.data.errors);
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-body">
                <form onSubmit={storeSlider}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Image</label>
                        <input type="file" id="file" className="form-control" accept="images/*" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    {errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}

                    <div>
                        {loading ? (
                            <button type="button" disabled className="btn btn-tertiary me-2">
                                <i className="fa fa-save"></i>&nbsp;Loading ...
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="btn btn-md btn-primary me-2">
                                    <i className="fa fa-save"></i> Upload
                                </button>
                                <button type="reset" className="btn btn-md btn-warning">
                                    <i className="fa fa-redo"></i> Reset
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SlidersCreate;
