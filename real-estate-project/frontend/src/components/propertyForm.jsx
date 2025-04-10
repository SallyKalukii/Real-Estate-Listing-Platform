import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PropertyForm = ({ show, onHide, onSubmit, property, title }) => {
  const [formData, setFormData] = useState(property || {
    name: '',
    location: '',
    price: '',
    category: '',
    status: 'Available',
    transactionType: 'sale',
    amenities: { size: '', beds: '', baths: '' },
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = ['Apartment', 'Villa', 'Office', 'House', 'Condo'];
  const locations = ['New York', 'Miami', 'Los Angeles', 'Chicago', 'Houston'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('amenities.')) {
      const amenityField = name.split('.')[1];
      setFormData({
        ...formData,
        amenities: {
          ...formData.amenities,
          [amenityField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Property name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Process images (in a real app, you would upload them)
    const processedProperty = {
      ...formData,
      price: Number(formData.price),
      images: selectedFiles.length > 0 ? 
        Array.from(selectedFiles).map(file => URL.createObjectURL(file)) : 
        formData.images
    };
    
    onSubmit(processedProperty);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Property Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Select
              name="location"
              value={formData.location}
              onChange={handleChange}
              isInvalid={!!errors.location}
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transaction Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="Sale"
                name="transactionType"
                type="radio"
                value="sale"
                checked={formData.transactionType === 'sale'}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Rent"
                name="transactionType"
                type="radio"
                value="rent"
                checked={formData.transactionType === 'rent'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </Form.Select>
          </Form.Group>

          <h5>Amenities</h5>
          <div className="row mb-3">
            <Form.Group className="col-md-4">
              <Form.Label>Size (sqft)</Form.Label>
              <Form.Control
                type="text"
                name="amenities.size"
                value={formData.amenities.size}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Beds</Form.Label>
              <Form.Control
                type="number"
                name="amenities.beds"
                value={formData.amenities.beds}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Baths</Form.Label>
              <Form.Control
                type="number"
                name="amenities.baths"
                value={formData.amenities.baths}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div className="mt-2">
              {formData.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt="Property" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                />
              ))}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PropertyForm;