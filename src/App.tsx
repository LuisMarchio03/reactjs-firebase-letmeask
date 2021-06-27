import { BrowserRouter, Route, Switch } from "react-router-dom";

import {AuthContextProvider} from './contexts/AuthContext';

import { useTheme } from "./hooks/useTheme";

import { AdminRoom } from "./pages/AdminRoom";
import { Home } from './pages/Home';
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import './styles/theme.scss';

function App() {
  const { theme } = useTheme();
  
  return (
    <div id="theme" className={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
