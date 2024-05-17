// import React from 'react'
// import LoginAuth from './components/crud'

// const App = () => {
//   return (
//     <div>
//       <LoginAuth />
//     </div>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAuth from './components/crud';
import TableCrud from './components/navbar/date';
// import Navigeyt from './components/navbar/date';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginAuth />} />
        <Route path="/Navigeyt" element={<TableCrud />} />
      </Routes>
    </Router>
  );
};

export default App;