import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/app.route';
import { AuthProvider } from './features/auth/auth.context';

import { InterviewProvider } from './features/interview/interview.context'; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        
        <InterviewProvider>
          <div>
            <AppRoutes />
          </div>
        </InterviewProvider>
      </AuthProvider>
    </Router>
  )
}

export default App