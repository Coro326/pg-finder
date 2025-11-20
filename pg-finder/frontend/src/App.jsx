



// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import PGList from "./pages/PGList";
// import PGDetails from "./pages/PGDetails";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       {/* Main centered area */}
//       <div className="main-container">
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/pgs" element={<PGList />} />
//             <Route path="/pgs/:id" element={<PGDetails />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PGList from "./pages/PGList";
import PGDetails from "./pages/PGDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Full page wrapper */}
      <div
        style={{
          minHeight: "calc(100vh - 60px)", // 60px ≈ navbar height
          display: "flex",
          justifyContent: "center",        // center horizontally
        }}
      >
        {/* Centered content box */}
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",            // prevent too wide on large screens
            padding: "2rem 1.5rem 3rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pgs" element={<PGList />} />
            <Route path="/pgs/:id" element={<PGDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;





















