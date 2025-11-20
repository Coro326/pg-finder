// src/pages/PGDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function PGDetails() {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/pgs/${id}`)
      .then((res) => setPg(res.data))
      .catch((err) => console.error("Error fetching PG:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!pg) return <p>PG not found</p>;

  return (
    <div>
      <h2>{pg.name}</h2>
      <p>{pg.address}</p>

      <p>
        <strong>₹{pg.pricePerMonth}</strong> / month
      </p>
      <p>Type: {pg.gender}</p>

      {pg.distanceFromCollegeKm && (
        <p>Distance from college: {pg.distanceFromCollegeKm} km</p>
      )}

      {pg.facilities?.length > 0 && (
        <div>
          <h4>Facilities</h4>
          <ul>
            {pg.facilities.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {pg.college && (
        <p>
          Near College: {pg.college.name}{" "}
          {pg.college.city && `(${pg.college.city})`}
        </p>
      )}
    </div>
  );
}
