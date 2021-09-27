import './App.css';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <div id="leftmargin"></div>
      <div id="rightmargin"></div>
      <header><h1>Art</h1></header>   
      <div className="container">
        <div className="item">
          <img src="/"></img>
          <p className="item-title">Acrylic</p>
        </div>
        <div className="item">
          <img src="/"></img>
          <p className="item-title">Graphite</p>
        </div>
        <div className="item">
          <img src="/"></img>
          <p className="item-title">Charcoal</p>
        </div>
        <div className="item">
          <img src="/"></img>
          <p className="item-title">Pen Sketch</p>
        </div>
        <div className="item">
          <img src="/"></img>
          <p className="item-title">Color Pencil</p>
        </div>
      </div>   
    </Fragment>
  );
}

export default App;
