import React from 'react';
import { FaHeart } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="border-top bg-white mt-5">
            <div className="container py-4">
                <div className="row align-items-center">
                    <div className="col-md-7 text-center text-md-start mb-3 mb-md-0">
                        <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                            <h6 
                                className="mb-0 fw-bold" 
                                style={{ 
                                    fontFamily: "Georgia, serif",
                                    color: "#2c3e50"
                                }}
                            >
                                MyNotes
                            </h6>
                            <p className="mb-0 text-muted small" style={{ fontFamily: "Georgia, serif" }}>
                                &copy; {new Date().getFullYear()} • Organize your thoughts beautifully
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 text-center text-md-end">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-2">
                            <span className="text-muted small">Crafted with passion</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;