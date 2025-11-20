// src/pages/PGList.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PGList() {
  const [pgs, setPgs] = useState([]);
  const [gender, setGender] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const collegeId = query.get("collegeId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPGs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collegeId, gender, maxPrice]);

  function fetchPGs() {
    setLoading(true);

    const params = {};
    if (collegeId) params.collegeId = collegeId;
    if (gender) params.gender = gender;
    if (maxPrice) params.maxPrice = maxPrice;

    API.get("/pgs", { params })
      .then((res) => setPgs(res.data))
      .catch((err) => console.error("Error fetching PGs:", err))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <h2>PGs near your college</h2>

      <div style={{ margin: "1rem 0" }}>
        <label>
          Type:&nbsp;
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">All</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>

        <label style={{ marginLeft: "1rem" }}>
          Max price:&nbsp;
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 8000"
          />
        </label>
      </div>

      {loading && <p>Loading PGs...</p>}
      {!loading && pgs.length === 0 && <p>No PGs found.</p>}

      {pgs.map((pg) => (
        <div
          key={pg._id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/pgs/${pg._id}`)}
        >
          <h3>{pg.name}</h3>
          <p>{pg.address}</p>
          <p>
            <strong>₹{pg.pricePerMonth}</strong> / month
          </p>
          <p>Type: {pg.gender}</p>
          {pg.distanceFromCollegeKm && (
            <p>Distance: {pg.distanceFromCollegeKm} km</p>
          )}
          {pg.college && <p>Near: {pg.college.name}</p>}
        </div>
      ))}
    </div>
  );
}

