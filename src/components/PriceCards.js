import React from 'react';
import Countdown from 'react-countdown';
import '../design/Pricecard.css';
import simIcon from '../icons/icon-sim-purple.svg';


export const PriceCards = (props) => {
   const monthlyCost = props.activeProduct.monthly_cost,
        wasMonthlyCost = props.activeProduct.was_monthly_cost,
        countdownEndTime = props.activeProduct.countdown_end_time,
        simCount = props.simCount,
        monthlyCostOneSim = props.activeProductInfoForOneSim.monthly_cost,
        buttonContainerStyle = {marginTop: "1px"};
        renderer = ({ days, hours, minutes, seconds }) => {
              return <span className='countdown-timer' >{days}d {hours}h {minutes}m {seconds}s</span>;
        };
    return (
        <div className="price-card-main">
          {countdownEndTime ?
              <div className="pc-price-merich-text" >
                <div className="limited-offer-msg">Price has never been lower</div>
                <div className="countdown-timer_sub-main">
                    <Countdown date={countdownEndTime} renderer={renderer} />
                </div>
               </div>
               : null}
           <div className="price-card-main__selected">
               <div className="price-card-main__sim-selection">
                   <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <use xlinkHref={`${simIcon}#sim-card-count`}/>
                        <text x="18" y="50" fontFamily="Verdana" fontSize="35" fill="white">{simCount}</text>
                        <text x="18" y="70" fontFamily="Verdana" fontSize="10" fill="white">SIMs</text>
                   </svg>
               </div>
               <div className="price-card-main__data-selection">
                    <div className="s2 bold">{props.data}</div>
                    <span className="data-sel__desc">data allowance each</span>
               </div>
           </div>
           <PriceCardFeature/>
           { props.activeProduct.merch_strip_text ?
              <MerchStripText /> : null
           }
           <div className="price-card-container">
                <div className="price-card-container__savings-card">
                      <div className="sim-price-info">
                            <span className="was-monthly-cost">
                               <PreviousPrice monthlyCost={monthlyCost} wasMonthlyCost={wasMonthlyCost}/>
                            </span>
                            <PriceForSimAndData cost={monthlyCost} />
                            <sup className="bold price-card-symbol">Δ</sup>
                            <span>&nbsp;a month</span>
                      </div>
                      <div className="savings-price">
                         <div className="s4 bold price-card__savings_text">
                            <FindSaving simCount={simCount} monthlyCost={monthlyCost} monthlyCostOneSim={monthlyCostOneSim}/>
                         </div>
                         <p style={buttonContainerStyle}>12-month contract</p>
                      </div>
                    <div className="price-card__cta"><button data-product-group={props.data} data-sim-count={props.simCount} data-analytics-link="Add and continue" className="button_cta__choose-plan">Choose plan</button></div>
               </div>
            </div>
        </div>
    )
}

export const PriceCardFeature = (props) => {
    return (
            <div className="price-card__features">
              <div className="price-card__features--item">4G and 5G enabled</div>
              <div className="price-card__features--item">Unlimited minutes and texts</div>
              <div className="price-card__features--item">Access to 5 million BT Wi-fi hotspots</div>
              <div className="price-card__features--item">30-day money-back guarantee</div>
           </div>
    )
}

export const PreviousPrice = (props) => {
    let monthlyCost = props.monthlyCost,
        wasMonthlyCost = props.wasMonthlyCost,
        previousCost = '';
    if(monthlyCost < wasMonthlyCost){
        previousCost = <span>Was <span className="was-monthly-cost__value">£<PriceInEuro baseprice={wasMonthlyCost} /></span></span>
    }
    return (
        previousCost
    )
}

export const MerchStripText = (props) => {
    return (
        <div className="price-lower-message">Price has never been lower</div>
    )
}

const PriceInEuro = ({ baseprice }) =>
  Math.round(baseprice * 0.010);


export const GetPriceInEuro = (props) => {
    return (
        Math.round(props * 0.010)
    )
}


export const PriceForSimAndData = (props) => {
    return (
        <span className="s2 bold">£ <PriceInEuro baseprice={props.cost} /></span>
    )
}

export const CountdownUtil = (props) => {
    return (
        <Countdown date={props.countdownEndTime}/>
    )
}

export const FindSaving = (props) => {
    let priceInEuroVal = GetPriceInEuro(props.monthlyCostOneSim),
        expectedTotalPriceForSimCount = priceInEuroVal * props.simCount ,
        savedPriceForSimCount = expectedTotalPriceForSimCount - GetPriceInEuro(props.monthlyCost),
        savedPriceForSimCountData = '';
        if(savedPriceForSimCount){
            savedPriceForSimCountData = <span>You get a saving of £ {savedPriceForSimCount} a month</span>
        }
    return (
        savedPriceForSimCountData
    )
}




