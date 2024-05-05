import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Details from './components/Details/Details';
import Widget from './components/Widget/Widget';
// import Widget from './components/Widget/Widget';

export interface Item {
  id: number;
  name: string;
  text: string;
  checked: boolean;
}

const App = () => {
  return (
    <>
      <Header />
      <Widget />
      <Footer />
    </>
  );
};

export default App