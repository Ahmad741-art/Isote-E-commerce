
import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button onClick={()=>onChange(page-1)} disabled={page<=1}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button onClick={()=>onChange(page+1)} disabled={page>=totalPages}>Next</button>
    </div>
  );
}

