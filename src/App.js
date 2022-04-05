import './App.css';
import React from 'react';
import TariffService from './services/TariffService';
import OptionService from './services/OptionService';
import axios from 'axios';


class App extends React.Component{

  constructor() {
    super();
    this.state = {
      value : new Date().toLocaleTimeString(),
      tariffs : [],
      options : []
    }

    this.getTime = this.getTime.bind(this);
    this.getData = this.getData.bind(this);

    const updateData = this.getData;

    setInterval(this.getTime, 1000);
    
    let ws = new WebSocket("ws://localhost:8080/init");

    const messageHandler = function(event){
      console.log('Message from server ', event.data);
      updateData();
    };

    ws.addEventListener('open', function(){
      console.log('open connection');
    });

    ws.addEventListener('message', messageHandler);

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {

    axios.get('http://localhost:8080/options')
    .then((response) => {
    let testOption = response?.data;
    this.setState({...this.state, options : testOption})
    })
    .catch((error) => {
    console.log(error)
    });  

    axios.get('http://localhost:8080/tariffs')
    .then((response) => {
      let testTariff = response?.data;
      this.setState({...this.state, tariffs : testTariff})
    })
    .catch((error) => {
      console.log(error)
    });
       
  }

  getTime() {
    this.setState({...this.state, value: new Date().toLocaleTimeString()});
  }

  render() {
    return (
      <div className="App">
        <div className='time'>
          <h1 id='time'>{this.state.value}</h1> 
        </div>
        <div id='serverInfo'>
          <div className='divTariffs'>
          <table className='headTable'>
            <tbody>
              <tr>
                <td colSpan={3}>Тарифы</td>
              </tr>
              <tr>
                <td>
                  Название
                </td>
                <td>
                  Опции
                </td>
                <td>
                  Платеж
                </td>
              </tr>
            </tbody>
          </table>
          <div className="tariffs"> 
          {this.state.tariffs.map((tariff) => 
            <div key={tariff.name}>
              <table>
                <tbody>
                  <tr>
                    <td>{tariff.name}</td>
                    <td>
                      <div className='tariffOptions'>
                        <ul>
                        {tariff.optionsDTO.map((optionDTO) => 
                        <li key={optionDTO.name}>{optionDTO.name}</li>
                        )}
                        </ul>
                      </div>
                    </td>
                    <td>{tariff.payment}</td>
                  </tr>
                </tbody>
              </table>
            <hr></hr>
            </div>  
            )}
          </div> 
          </div>
          <div className='divOptions'>
          <table className='headTable'>
            <tbody>
              <tr>
                <td colSpan={3}>Опции</td>
              </tr>
              <tr>
                <td>
                  Название
                </td>
                <td>
                  Платеж
                </td>
                <td>
                  Стоимость подключения
                </td>
              </tr>
            </tbody>
          </table>
          <div className="options">
            {this.state.options.map((option) => 
            <div key={option.name}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {option.name}
                    </td>
                    <td>
                      {option.payment}
                    </td>
                    <td>
                      {option.connectionPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr></hr>
            </div>            
            )} 
            </div>
          </div> 
        </div>
        <hr></hr>
      </div>
    );
  }

}

export default App;
