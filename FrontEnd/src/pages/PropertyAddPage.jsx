import React, { useState } from 'react'

const PropertyAddPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    id: '',
    type: '',
    name: '',
    description: '',
    imagethumbnail: '',
    imageLg: '',
    country: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    surface: '',
    year: '',
    price: '',
    agentName: '',
    agentPhone: '',
    agentImage: '',
    });
    
  const [imagePreview, setImagePreview] = useState('')


  const handleChange = (e) => {
    const { name, value } =e.target
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader() 
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview('')
    } 
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data to the backend or handle it accordingly
    console.log('Property details submitted:', propertyDetails);
  };

  return (
    <div className='container mx-auto min-h-[1500px]'>
      <div className='flex-1 bg-white w-full mb-8 border 
        border-gray-300 rounded-lg px-6 py-8'>
      <form action="" className='flex flex-col gap-6' onSubmit={handleSubmit}>
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
        <label className='bg-white text-gray-500 font-semibold text-base
          rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2
          border-gray-300 border-dashed mx-auto font-[sans-serif]
        '>
          {imagePreview ? (
              <img src={imagePreview} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000" />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000" />
                </svg>
                Upload thumbnail image
                <p className='text-xs font-medium text-gray-400 mt-2 '>PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </>
            )
            }
          <input type="file" id='uploadFile1' className='hidden' onChange={handleFileChange} />
        </label>
        <label className='bg-white text-gray-500 font-semibold text-base
          rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2
          border-gray-300 border-dashed mx-auto font-[sans-serif]
        '>
          {imagePreview ? (
              <img src={imagePreview} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000" />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000" />
                </svg>
                Upload image for property details
                <p className='text-xs font-medium text-gray-400 mt-2 '>PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </>
            )
            }
          <input type="file" id='uploadFile1' className='hidden' onChange={handleFileChange} />
        </label>
        <input
          type="text"
          name="country"
          placeholder='Country'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder='Address'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bedrooms"
          placeholder='Bedrooms'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.bedrooms}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bathrooms"
          placeholder='Bathrooms'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.bathrooms}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surface"
          placeholder='Surface'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.surface}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder='Year'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.year}
          onChange={handleChange}
        />
        <input
          type="text"
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
        <input
          type="text"
          name="agentImage"
          placeholder='Agent Image URL'
          className='border border-gray-300 focus:border-violet-700 outline-none rounded-full px-4 h-14 text-sm'
          value={propertyDetails.agentImage}
          onChange={handleChange}
        />
        <button className='bg-violet-700 hover:bg-violet-800 rounded p-4 text-white w-full transition'>
          Add Property
        </button>
      </form>
      </div>
    </div>
  )
}

export default PropertyAddPage