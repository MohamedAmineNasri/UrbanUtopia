import { useState, useEffect, createContext } from "react"

import { housesData } from '../data'

export const HouseContext = createContext()


const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const allContries = houses.map((house) => {
      return house.country
    })
    const uniqueContries = ['Location (any)', ...new Set(allContries)]
    setCountries(uniqueContries)
  },[])

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type
    })
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]
    setProperties(uniqueProperties)
  },[])

  const handleClick = () => {
    console.log("clicked")
  }
  return (
    <HouseContext.Provider value={{
      houses,
      setHouses,
      country,
      setCountry,
      countries,
      setCountries,
      property,
      setProperty,
      properties,
      setProperties,
      price,
      setPrice,
      loading,
      setLoading,
      handleClick
    }}>{children}</HouseContext.Provider>
  )
}

export default HouseContextProvider