import './App.css';
import { NumberProvider } from './Context/NumberContext';
import Header from './Component/Header';
import Body from './Component/Body';
import Footer from './Component/Footer';

function App() {
  return (
    <NumberProvider>
      <div className='app'>
        <Header />
        <Body />
        <Footer />
      </div>
    </NumberProvider>
  );
}

export default App;
