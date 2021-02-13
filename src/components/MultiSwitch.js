import React,{Component} from 'react'
import {MultiSwitchHeading} from './MultiSwitchHeading';
import {PriceCards} from './PriceCards';
import products from './data/products.json';

class MultiSwitch extends Component {
    constructor (props){
        super(props);
        this.state = {
            simCount : '2',
            data : '1GB',
            showPriceCard : false
        };

    }
    componentDidMount() {
        this.setState({
            showPriceCard : true
        })
       this.updateActiveProduct(this.state.simCount,this.state.data)
    }
    render() {
        const simCountsArr = [],
              dataArray = [],
              buttonContainerStyle = {
                marginInline: "auto"
              },
              subDescStyle = {
                fontSize : "12px",
                fontFamily: "Arial, sans-serif"
              },
              headingStyle = {
                margin : "5px"
              },
              separator = "MOB-",
              productJson = {products}['products'];
        for (let [index, sim] of this.props.sims.entries()) {
                simCountsArr.push(
                    <button className={`multi-switch-button ${index === 0 ? 'multi-switch-button_active' : ''}`} value={sim} data-sim-count={sim} onClick={this.handleSimSelectionClick}>{sim}</button>
                )
        }
        for (let [index, data] of Object.keys(productJson).entries()) {
                let dataValue = data.toString().replace(separator,'');
                dataArray.push(
                    <button className={`multi-switch-button ${index === 0 ? 'multi-switch-button_active ' : ''}`} value={dataValue} data-product-group={dataValue} onClick={this.handleDataSelectionClick}>{dataValue}</button>
                )
        }
        return(
           <div>
                <div>
                   <MultiSwitchHeading heading={this.props.simHeading} style={headingStyle} />
                   <span style={subDescStyle}>{this.props.description}</span>
                   <div style={buttonContainerStyle}>
                       {simCountsArr}
                   </div>
                   <MultiSwitchHeading heading={this.props.dataHeading} style={headingStyle} />
                    <div style={buttonContainerStyle}>
                      {dataArray}
                    </div>
                </div>
                {this.state.showPriceCard ?
                   <PriceCards data={this.state.data} simCount={this.state.simCount} activeProduct={this.state.activeProductDataJson} activeProductInfoForOneSim= {this.state.activeProductJsonForOneSim} /> :
                   null
                }
           </div>
        );
    }
    handleSimSelectionClick = (event) => {
        this.setState({
            simCount : event.target.value,
            showPriceCard : true,
        });
        this.toggleState(event.target);
        this.updateActiveProduct(event.target.value,this.state.data);
    }
    handleDataSelectionClick = (event) => {
        this.setState({
            data : event.target.value,
            showPriceCard : true,
        });
        this.toggleState(event.target);
        this.updateActiveProduct(this.state.simCount,event.target.value);

    }
   toggleState(activeEleId) {
        let buttonElement = activeEleId.parentElement.children;
        for(let index=0; index<buttonElement.length;index++){
            buttonElement[index].classList.remove("multi-switch-button_active")
        }
        activeEleId.classList.add("multi-switch-button_active")
   }
   updateActiveProduct(simCount,data){
        let product = {products}['products'],
            activeProductSimJson = product['MOB-'+data],
            activeProductDataJson = activeProductSimJson.filter((product) => product.sim_count == simCount)[0],
            activeProductJsonForOneSim = activeProductSimJson.filter((product) => product.sim_count == 1)[0]
            this.setState({
                activeProductDataJson : activeProductDataJson,
                activeProductJsonForOneSim : activeProductJsonForOneSim
            });
   }

}
export default MultiSwitch;

