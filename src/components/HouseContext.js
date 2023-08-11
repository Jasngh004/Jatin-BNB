import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { createContext, useEffect, useState } from 'react';
import { housesData } from '../data';


export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const[houses,setHouses] = useState(housesData);
  const[country,setCountry] = useState('Location (any)');
  const[countries,setCountries] = useState([]);
  const[property,setProperty] = useState('property type (any)');
  const[properties,setProperties] = useState([]);
  const[price,setPrice] = useState('price range (any)');
  const [loading,setLoading] = useState(false);

  useEffect(() =>{
    const allCountries = houses.map((house)=>{
      return house.country;
    });
    //removing duplicates countries
    const uniqueCountries = ['Location (any)',... new Set(allCountries)];
    
    setCountries(uniqueCountries);
  },[]);

  useEffect(() =>{
    const allProperties = houses.map((house)=>{
      return house.type;
    });
    //removing duplicates countries
    const uniqueProperties = ['Location (any)',... new Set(allProperties)];
    
    setProperties(uniqueProperties);
  },[]);
 
  const handleClick=() =>{
    setLoading(true);

//creating a function which checks if the dtring includes '(any)
    const isDefault = (str)=>{
      return str.split(' ').includes('(any)');
    };
    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);
 
    const newHouses = housesData.filter((house)=>{
      const housePrice = parseInt(house.price);

      // if all values are selected
      if(
        house.country === country &&
        house.type=== property &&
        house.price >= minPrice &&
        housePrice <=maxPrice
      ){
        return house;
      }

      //if all values are default
      if(!isDefault(country) && isDefault(property) && isDefault(price)){
        return house;
      }
      // if country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country;
      }
      // if property is not default
      if(!isDefault(property) && isDefault(country) && isDefault(price)){
        return house.type === property;
      }
      //if price is not default 
      if (!isDefault(price) && isDefault(country)&& isDefault(property)){
        if (housePrice >= minPrice && housePrice <= maxPrice){
          return house;
        }
      }

      // if country & property is not default
      if(!isDefault(country)&& !isDefault(property) && isDefault(price)){
        return house.country === country && house.type === property;
      }
      // if country & price is not default
      if(!isDefault(country) && !isDefault(property) && isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.country === country;
        }
      }

      //property and price is not default
      if(isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.type === property;
        }
      }
    });

    setTimeout(() =>{
      return newHouses.length < 1 ? setHouses([]) :
      setHouses(newHouses),
      setLoading(false);
    },1000);  
  
  };


  return ( <HouseContext.Provider value={{
    country,
    setCountry,
    countries,
    property,
    setProperty,
    properties,
    price,
    setPrice,
    houses,
    loading,
    handleClick,
    loading,
  }}>
    {children}
  </HouseContext.Provider>
  );
};

export default HouseContextProvider;
