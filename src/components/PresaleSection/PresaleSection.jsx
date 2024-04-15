import PresaleForm from '../PresaleForm/PresaleForm';
import './PresaleSection.css';

const Presale = () => {
  return <div className="presale">
    <div className="presale__container">
        <div className="presale__left">
          <div>
            <img src="../../assets/gif2.gif" style={{zIndex: 1111, maxWidth: '192px'}} alt="Image" />
          </div>
          
          <PresaleForm />

          <div>
            <img src="../../assets/logo_back.webp" style={{zIndex: 1111, maxWidth: '360px', marginTop: '-80px', marginLeft: '80px'}} alt="Image" />
          </div>
        </div>
    </div>
  </div>;
};

export default Presale;
