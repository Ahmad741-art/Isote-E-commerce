
import React from "react";

export default function Filters({ onFilter }) {
  const apply = (e) => {
    e.preventDefault();
    const form = e.target;
    onFilter({
      category: form.category.value,
      min: form.min.value,
      max: form.max.value
    });
  };
  return (
    <form onSubmit={apply} className="filters">
      <select name="category">
        <option value="">All categories</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select>
      <input name="min" placeholder="Min price" />
      <input name="max" placeholder="Max price" />
      <button className="btn">Apply</button>
    </form>
  );
}

