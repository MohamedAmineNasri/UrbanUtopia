import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const PropertyAddPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    type: '',
    name: '',
    description: '',
    imagethumbnail: null,
    imageLg: null,
    country: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    surface: '',
    year: '',
    price: '',
    agentName: '',
    agentPhone: '',
  });
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imageLgPreview, setImageLgPreview] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry?.label) {
      const countryName = selectedCountry.label.split(' ')[1];
      console.log(countryName); 
      setPropertyDetails(prevDetails => ({
        ...prevDetails,
        country: countryName,
      }));
    }
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      [name]: file,
    }));

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === 'imagethumbnail') {
        setThumbnailPreview(reader.result);
      } else if (name === 'imageLg') {
        setImageLgPreview(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(propertyDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Property details submitted:', response.data);
    } catch (error) {
      console.error('Error submitting property details:', error.response ? error.response.data : error.message);
    }
  };
  
  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };

  return (
    <div className='container mx-auto min-h-[1500px]'>
      <div className='flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8'>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder='Name'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder='Type'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.type}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder='Description'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm placeholder:translate-y-4'
            value={propertyDetails.description}
            onChange={handleChange}
          />
          <label className='bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]'>
            {thumbnailPreview ? (
              <img src={thumbnailPreview} className="max-h-48 rounded-lg mx-auto" alt="Thumbnail preview" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                Upload thumbnail image
                <p className='text-xs font-medium text-gray-400 mt-2'>PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </>
            )}
            <input type="file" name="imagethumbnail" className='hidden' onChange={handleFileChange} />
          </label>
          <label className='bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]'>
            {imageLgPreview ? (
              <img src={imageLgPreview} className="max-h-48 rounded-lg mx-auto" alt="Large image preview" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                Upload large image
                <p className='text-xs font-medium text-gray-400 mt-2'>PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </>
            )}
            <input type="file" name="imageLg" className='hidden' onChange={handleFileChange} />
          </label>
          <div className='flex justify-center items-center border border-gray-300 focus-within:border-violet-700 outline-none rounded-full px-4 h-14 text-sm w-full'>
            <Select
              name="country"
              className="outline-none text-sm w-full"
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder='Address'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.address}
            onChange={handleChange}
          />
          <input
            type="number"
            name="bedrooms"
            placeholder='Bedrooms'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.bedrooms}
            onChange={handleChange}
          />
          <input
            type="number"
            name="bathrooms"
            placeholder='Bathrooms'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.bathrooms}
            onChange={handleChange}
          />
          <input
            type="number"
            name="surface"
            placeholder='Surface'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.surface}
            onChange={handleChange}
          />
          <input
            type="number"
            name="year"
            placeholder='Year'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.year}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder='Price'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="agentName"
            placeholder='Agent Name'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.agentName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="agentPhone"
            placeholder='Agent Phone'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
            value={propertyDetails.agentPhone}
            onChange={handleChange}
          />
          <button type="submit" className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-full'>Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyAddPage;
