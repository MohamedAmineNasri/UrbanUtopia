
import { useState } from "react"
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

import { Menu } from "@headlessui/react"
import { useContext } from 'react'
import { HouseContext } from './HouseContext'

const CountryDropdown = () => {
  const {country, 
    setCountry, countries} = useContext(HouseContext)

    const [isOpen, setIsOpen] = useState(false)
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full text-left'>
        <RiHome5Line 
          className="dropdown-icon-primary"
        />
        <div className="text-[15px] font-medium leading-tight">
          <div>{country}</div>
          <div className="text-[13px]">Select Your Place</div>
        </div>
          {
            isOpen ? (
              <RiArrowUpSLine className="dropdown-icon-secondary" />
            ) : (
              <RiArrowDownSLine className="dropdown-icon-secondary" />
            )
          }
      </Menu.Button>
      <Menu.Items className='dropdown-menu'>
        {countries.map((country, index) => {
          return (
            <Menu.Item 
              onClick={()=> setCountry(country)}
              className='cursor-pointer hover:text-violet-700 ' as='li' key={index}>
              {country} 
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}

export default CountryDropdown