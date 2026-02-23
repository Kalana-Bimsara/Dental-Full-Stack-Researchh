// React import not required with the new JSX runtime
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="bg-secondary text-white py-4 shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-center mb-3">
            <p className="fs-5 text-white mb-1">
              Smile Dental – Providing trusted dental care for all ages.
            </p>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <a href="https://www.facebook.com" className="me-3">
              <img src="fb.png" alt="Facebook" style={{ width: "30px ", height: "30px" }} />
            </a>
            <a href="https://www.youtube.com" className="me-3">
              <img src="yt.png" alt="YouTube" style={{ width: "30px", height: "30px" }} />
            </a>
            <a href="https://www.instagram.com" className="me-3">
              <img src="instra.png" alt="Instagram" style={{ width: "30px", height: "30px" }} />
            </a>
          </div>
          <div className="text-center">
            <p className="mb-1">© 2024 Smile Dental | All Rights Reserved</p>
            <p className="mb-0">Call <span className="fs-4">0777 38 65 90</span> for appointments</p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;