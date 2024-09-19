// import React from 'react'

const footer = () => {
    return (
        <footer>
            <div className="container-fluid footer-top">
                <div className="row p-4">
                    <div className="col-md-4 mb-4 mt-3">
                        <h5>
                            TENTANG
                            <strong style={{ color: '#ffd22e' }}> Dapur Caguna</strong>
                        </h5>
                        <hr />
                        <div className="text-center">
                            <img src="/images/logo_dapurcaguna.jpg" width="70" />
                        </div>
                        <p className="text-justify mt-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum eaque, dicta laborum quaerat cumque voluptatem.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 mt-3">
                        <h5>
                            DOWNLOAD <strong style={{ color: '#ffd22e' }}> APLIKASI</strong>
                        </h5>
                        <hr />
                        <div className="text-left">
                            <img src="/images/playstore.png" width={'180'} className="text-center align-items-center" />
                        </div>
                        <p className="text-justify mt-2 text-left">
                            Dapatkan info update Desa lebih cepat melalui aplikasi Android. Silahkan unduh melalui PlayStore.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 mt-3">
                        <h5>
                            KONTAK <strong style={{ color: '#ffd22e' }}>KAMI</strong>
                        </h5>
                        <hr />
                        <p>
                            <i className="fa fa-map-marker"></i> Kp Ciwadas RT 16 RW 04 jalan Kali Leweng Sereh Desa Klari Kec Klari kab Karawang Jawa
                            Barat
                            <br />
                            <br />
                            <i className="fas fa-envelope"></i> info@dapurcaguna.sahabatternak.com
                            <br />
                            <br />
                            <i className="fas fa-phone"></i> +62 852-8741-6169
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-fluid footer-bottom">
                <div className="row p-3">
                    <div className="text-center text-white font-weight-bold">
                        Copyright © {new Date().getFullYear()} Dapur Caguna. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default footer;
