
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/app.route';
import { AuthProvider } from './features/auth/auth.context';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <div>
        <AppRoutes />
      </div>
      </AuthProvider>
    </Router>
  )
}

export default App