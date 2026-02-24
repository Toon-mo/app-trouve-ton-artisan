import { Link } from "react-router-dom";
import "../styles/components/_footer.scss";
import LogoImg2 from "../assets/images/Logo 2.png";

const Footer = () => {
  return (
    <div className="custom-footer-shape">
      <div className="footer-content-wrapper">
        <div className="site-footer-fluid bg-custom-1 mt-3 text">
          <div className="footer-container justify-content-evenly">
            <div
              className="container-left d-flex flex-column col-12 col-md-3 ms-5 ms-md-0 mb-5 mb-md-0"
              id="logo"
            >
              <Link className="logo mt-0" to="/">
                <img className="img-fluid" src={LogoImg2} alt="Logo" />
              </Link>
            </div>
            <div
              className="container-right d-flex flex-column justify-content-center align-items-start col-12 col-md-3 ms-5 ms-md-0 mb-5"
              id="adresse"
            >
              <h4 className="mt-5">Lyon</h4>
              <p>
                <br />
                101 cours Charlemagne <br />
                CS 20033 <br />
                69269 Lyon CEDEX 02 <br />
                France <br />
                +33 (0)4 26 73 40 00 <br />
              </p>
            </div>
          </div>
          <div className="footer-bottom-section">
            <div className="separation mt-1"></div>

            <div className="container-fluid">
              <ul className="list-unstyled justify-content-evenly listItem">
                <li className="list-group-item mb-4">
                  <Link
                    className="text-decoration-none text-white"
                    to="/mentions-legales"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li className="list-group-item mb-4">
                  <Link
                    className="text-decoration-none text-white"
                    to="/accessibilite"
                  >
                    Accessibilité
                  </Link>
                </li>
                <li className="list-group-item mb-4">
                  <Link className="text-decoration-none text-white" to="/data">
                    Données personnelles
                  </Link>
                </li>
                <li className="list-group-item mb-4">
                  <Link
                    className="text-decoration-none text-white"
                    to="/contacts"
                  >
                    Contacts
                  </Link>
                </li>
                <li className="list-group-item mb-4">
                  <Link className="text-decoration-none text-white" to="/presse">
                    Presse
                  </Link>
                </li>
                <li className="list-group-item mb-4">
                  <Link
                    className="text-decoration-none text-white"
                    to="/cookies"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
