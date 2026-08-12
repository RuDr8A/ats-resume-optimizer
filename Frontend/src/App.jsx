
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/app.route';

const App = () => {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App