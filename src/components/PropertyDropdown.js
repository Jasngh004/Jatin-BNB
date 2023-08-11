import React, { useContext, useState } from 'react';
import { RiHome5Line, RiMapPinLine,RiArrowDownSLine,RiArrowUpSLine} from 'react-icons/ri';
import {Menu } from '@headlessui/react';
import { HouseContext } from './HouseContext';
import { housesData } from '../data';

const PropertyDropdown = () => {
  const {property,setProperty,properties} = useContext(HouseContext);
  // console.log(properties);
  const[isOpen,setisOpen] = useState(false);


  return <Menu as = 'div' className='dropdown relative'>
    <Menu.Button onClick={() => setisOpen(!isOpen)} className='dropdown-btn w-full text-left'>
      <RiHome5Line className='dropdown-icon-primary'/>
      <div>  
        <div className='text-[15px] font-medium leading-tight' >{property}</div>
        <div className='text-[13px]'>Select Your Place</div>
        {
          isOpen ? (
             <RiArrowUpSLine
             className='dropdown-icon-secondary' />
          ) : (
            <RiArrowDownSLine
            className='dropdown-icon-secondary' />
          )
        }
      </div>
    </Menu.Button>

    <Menu.Items className='dropdown-menu'>
      {properties.map((property,index) =>{
        return (
          <Menu.Item 
          onClick={() =>setProperty(property)}
          className='cursor-pointer hover:text-violet-700 transition' as='li' key ={index}>
            {property}

          </Menu.Item>
        );
      })}
    </Menu.Items>
  </Menu>
};

export default PropertyDropdown;