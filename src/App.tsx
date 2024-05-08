import { FC } from 'react';
import Header from './components/UI/Header/Header';
import Widget from './components/Widget/Widget';
import Footer from './components/UI/Footer/Footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <Widget />
      <Footer />
    </>
  )
};

export default App;