import React, { useState, useEffect } from 'react';
import './pagination.css'

function Pagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        alert('‘failed to fetch data');
      } 
      setLoading(false)
    };

    fetchData();
  }, [page]);

  const handleNext = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderTableData = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = Math.min(startIndex + 10, data.length);
    return data.slice(startIndex, endIndex).map((row, index) => (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.role}</td>      
      </tr>
    ));
  };

  return (
    <div className='container'>
        <h2>Employee Data Table</h2>
      {loading ? null : (
        <div>
          <table>
            <thead className='head'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {renderTableData()}
            </tbody>
          </table>
          <div className='buttons'>
            <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
            <button>{page}</button>
            <button onClick={handleNext} disabled={page === 5}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;