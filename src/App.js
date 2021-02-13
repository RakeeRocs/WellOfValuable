import logo from './logo.svg';
import './App.css';
import {MultiSwitchTitle} from './components/MultiSwitchTitle';
import MultiSwitch from './components/MultiSwitch';
import products from './components/data/products.json';


function App() {
  const sims = [2, 3, 4, 5];


  return (
    <div className="App">
      <MultiSwitchTitle title="Multi-Switch component"/>
      <MultiSwitch simHeading="How many SIMs do you need?"
                   dataHeading="How much data would you like per SIM?"
                   description ="Each extra SIM has a 20% discount"
                   sims = {sims}/>
    </div>
  );
}

export default App;
