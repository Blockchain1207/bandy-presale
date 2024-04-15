import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord, faYoutube, faTelegram } from "@fortawesome/free-brands-svg-icons"

import './FooterSection.css'

const FooterSection = () => {
  return <div className='footer'>
    <div className="footer-container">
      <div className="footer-socialicons">
        <ul>
        <li><a href="https://t.me/blastedandy" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTelegram} /></a></li>
          <li><a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="https://discord.gg/nU44V7nH" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a></li>
        </ul>
      </div>

      <p className="text-white text-center pb-1">Copyright © 2024. All rights reserved.</p>
    </div>
  </div>;
};

export default FooterSection;
