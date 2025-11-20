// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    API.get("/colleges")
      .then((res) => setColleges(res.data))
      .catch((err) => console.error("Error fetching colleges:", err))
      .finally(() => setLoading(false));
  }, []);

  function handleSearch() {
    if (!selectedCollege) {
      alert("Please select a college first");
      return;
    }
    navigate(`/pgs?collegeId=${selectedCollege}`);
  }

  return (
    <div>
      <h1>Find PGs near your College</h1>
      <p>Select your college and see nearby PGs.</p>

      {loading && <p>Loading colleges...</p>}

      <div style={{ marginTop: "1rem" }}>
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="">Select College</option>
          {colleges.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} {c.city ? `- ${c.city}` : ""}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          style={{ marginLeft: "1rem", padding: "0.3rem 0.8rem" }}
        >
          Search PGs
        </button>
      </div>
    </div>
  );
}
