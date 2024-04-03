import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Products from './components/Products';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
     <Header/>
     <div className="app-body">

     <SideMenu/>
      <Home/>
    {/* <Products/> */}
    </div>
    </div>
  );
}

export default App;
