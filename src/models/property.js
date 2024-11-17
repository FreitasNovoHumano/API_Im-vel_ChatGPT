// src/models/property.js
class Property {
    constructor(id, title, description, price, type, address, bedrooms, bathrooms, area) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.type = type;
      this.address = address;
      this.bedrooms = bedrooms;
      this.bathrooms = bathrooms;
      this.area = area;
    }
  }
  
  module.exports = Property;
  