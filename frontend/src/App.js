import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CodeBlockPage from './CodeBlockPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/findAllCodeBlocks')
      .then(res => {
        setCodeBlocks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            {codeBlocks &&
              codeBlocks.map(block => {
                console.log(block);
                return (
                  <Route
                    key={block._id}
                    // path={`/${block.name}`}
                    path={`/${block._id}`}
                    // path={`${block.title.replace(/\s+/g, '-')}/${block._id}`}
                    element={<CodeBlockPage block={block} />}
                  />
                );
              })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
