
import './App.css';
import { HomePage } from './Pages/home-page/home-page.component.jsx';
import ShopPage from './Pages/shop-page/shop-page.component';
import {Switch,Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route  path='/shop' component={ShopPage}/>

      </Switch>
    </div>
  );
}

export default App;
