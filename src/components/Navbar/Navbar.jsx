import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faDiscord,
    faYoutube,
    faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import "./Navbar.css";
import { useRef } from "react";

const Navbar = () => {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__left">
                    <a
                        className="mt-3 mx-md-3 mx-2 textshad3"
                        href="#"
                        style={{ textDecoration: "none", color: "#000000" }}
                    >
                        <img src="../../assets/logo.webp" style={{zIndex: 1111, maxWidth: '192px', marginLeft:'-70px'}} alt="Image" />
                        {/* <h1
                            className="fredoka-bold fw-bold"
                            style={{ fontFamily: 'Characters Demo', fontSize: '36px', fontWeight: "800", letterSpacing: "8px" }}
                        >
                            BANDY
                        </h1> */}
                    </a>
                </div>

                <div className="navbar__right">
                    <ul>
                        <li>
                            <a
                                href="https://t.me/blastedandy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faTelegram} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://discord.gg/nU44V7nH"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faDiscord} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
