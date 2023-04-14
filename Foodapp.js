import React, { useState, useEffect } from 'react';

const FoodApp = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState('Delicious Food');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(0);
  const [selectedFoodType, setSelectedFoodType] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('foodItems')) || [];
    setFoodItems(items);
  }, []);

  useEffect(() => {
    const filteredItems = foodItems.filter((item) => {
      if (selectedFoodType && item.foodType !== selectedFoodType) {
        return false;
      }
      if (maxDeliveryTime && item.maxDeliveryTime > maxDeliveryTime) {
        return false;
      }
      return true;
    });
    setFilteredFoodItems(filteredItems);
  }, [foodItems, selectedFoodType, maxDeliveryTime]);

  const handleFoodNameChange = (e) => {
    setFoodName(e.target.value);
  };

  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
  };

  const handleMaxDeliveryTimeChange = (e) => {
    setMaxDeliveryTime(parseInt(e.target.value));
  };

  const handleAddFoodSubmit = (e) => {
    e.preventDefault();
    const newItem = { foodName, foodType, maxDeliveryTime };
    setFoodItems([...foodItems, newItem]);
    setFoodName('');
    setFoodType('Delicious Food');
    setMaxDeliveryTime(0);
    localStorage.setItem('foodItems', JSON.stringify([...foodItems, newItem]));
  };

  const handleFoodTypeFilterChange = (e) => {
    setSelectedFoodType(e.target.value);
  };

  return (
    <div>
      <h1>Food App</h1>
      <nav>
        <button onClick={() => setSelectedFoodType('')}>Clear filters</button>
      </nav>
      <h2>Add Food</h2>
      <form onSubmit={handleAddFoodSubmit}>
        <label>
          Food Name:
          <input type="text" value={foodName} onChange={handleFoodNameChange} required />
        </label>
        <label>
          Food Type:
          <select value={foodType} onChange={handleFoodTypeChange} required>
            <option value="Delicious Food">Delicious Food</option>
            <option value="Nutritious Food">Nutritious Food</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Desserts">Desserts</option>
          </select>
        </label>
        <label>
          Max Delivery Time (in minutes):
          <input type="number" value={maxDeliveryTime} onChange={handleMaxDeliveryTimeChange} required />
        </label>
        <button type="submit">Add Food</button>
      </form>
      <hr />
      <h2>Food List</h2>
      <label>
        Filter by Food Type:
        <select value={selectedFoodType} onChange={handleFoodTypeFilterChange}>
          <option value="">All</option>
          <option value="Delicious Food">Delicious Food</option>
          <option value="Nutritious Food">Nutritious Food</option>
          <option value="Fast Food">
