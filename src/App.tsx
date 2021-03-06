import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert/Alert';
import UserDetail from './pages/UserDetail/UserDetail';

const App: FunctionComponent = () => {
  // This  is the method we can use to access ENV variables:
  // console.log(process.env.REACT_APP_GITHUB_TOKEN);

  console.log('ENV', process.env);

  return (
    <AlertProvider>
      <GithubProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:userId" element={<UserDetail />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </GithubProvider>
    </AlertProvider>
  );
};

export default App;
