import './PresaleValue.css';

const PresaleValue = () => {
    return <div className='presalevalue'>
        <h3 id='valueh3'>Value</h3>
        <p id='amountp'>Amount $1000 / $0.00001</p>

        <div className="presalevalue__fullinput">
          <input type='number' className='presalevalue__input' name="usdc-input"></input>
          <label className='presalevalue__label' htmlFor="usdc-input">BANDY</label>
        </div>

        <div className='presalevalue__usd'>USD<br></br>$1000</div>

        <div className="presalevalue__bar">
          <span className='presalevalue__bar-progress' style={{width: '5%'}}></span>
          <div className='presalevalue__bar-label'>.000001</div>
          <div className='presalevalue__bar-label2'>$1</div>
        </div>

    </div>

};

export default PresaleValue