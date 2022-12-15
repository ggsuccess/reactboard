import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import Write from './pages/Write';
import Update from './pages/Update';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/write" element={<Write />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </>
  );
};

export default App;
