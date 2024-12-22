import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Edit.css";

const Edit = ({ url }) => {
  const { id } = useParams(); // Get the food ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${id}`);
        if (response.data.success) {
          const food = response.data.data;
          setData({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
          });
          setImage(food.image ? `${url}/images/${food.image}` : null);
        } else {
          toast.error("Failed to load food details.");
        }
      } catch (error) {
        toast.error("Error fetching food details.");
      }
    };

    fetchFoodDetails();
  }, [id, url]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${url}/api/food/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list"); // Navigate to the food list after a successful update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating food item.");
    }
  };

  return (
    <div className="edit">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="edit-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? (image instanceof File ? URL.createObjectURL(image) : image) : "placeholder-image.png"}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter the Name"
            required
          />
        </div>
        <div className="edit-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Enter the Description"
            required
            rows="6"
          />
        </div>
        <div className="edit-category-price">
          <div className="edit-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
          <div className="edit-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs.200"
              required
            />
          </div>
        </div>
        <button type="submit" className="edit-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Edit;
