import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // Hooks should only be called inside components

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list!");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list
      } else {
        toast.error("Error removing the item.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the item.");
    }
  };

  const handleEdit = (foodId) => {
    navigate(`/edit/${foodId}`); // Navigate to the edit page
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price (Rs.)</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
            <div>
              <button onClick={() => handleEdit(item._id)}>Edit</button>
              <button onClick={() => removeFood(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
