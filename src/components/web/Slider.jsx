import { useState, useEffect } from 'react';
import Api from '../../services/Api';
import { Carousel } from 'react-bootstrap';
import Loading from '../general/Loading';

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    const [loadingSlider, setLoadingSlider] = useState(true);

    const fetchDataSliders = async () => {
        setLoadingSlider(true);
        try {
            await Api.get('/api/public/sliders').then((response) => {
                setSliders(response.data.data);
                setLoadingSlider(false);
            });
        } catch (error) {
            return error.message;
        }
    };

    useEffect(() => {
        fetchDataSliders();
    }, []);

    return (
        <Carousel
            prevIcon={<i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow-sm"></i>}
            nextIcon={<i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow-sm"></i>}
        >
            {loadingSlider ? (
                <Loading />
            ) : (
                sliders.map((slider) => (
                    <Carousel.Item key={slider.id}>
                        <img className="d-block w-100" src={slider.image} style={{ height: '678px', objectFit: 'cover' }} alt="First slide" />
                    </Carousel.Item>
                ))
            )}
        </Carousel>
    );
};

export default Slider;
