
import './App.css';
import { HomePage } from './Pages/home-page/home-page.component.jsx';
import ShopPage from './Pages/shop-page/shop-page.component';
import {Switch,Route} from 'react-router-dom';
import {Header} from './Components/header/header.component.jsx';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route  path='/shop' component={ShopPage}/>

      </Switch>
    </div>
  );
}

export default App;
