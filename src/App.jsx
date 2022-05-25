import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import List from './views/List';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route>
            <List />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
