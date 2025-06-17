import React from 'react'
import useGetCategories from '../../../hooks/useGetCategories';
import { styled } from '@mui/material';

const CategoryContent = styled("div") ({
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  height: "calc(100% - 78px)",
  overflowY: "auto",
  scrollbarWidth: "none",
})
const CategoryItem = styled("div") ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "1 1 32%",
  maxWidth: "32%",
  padding: "10px 15px",
  borderRadius:"10px",
  fontWeight: "bold",
  fontSize:"17px",
  "& img": {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  }

});

const CategoryList = () => {
    const { data } = useGetCategories();
    const categories = data?.categories.items || [];

    const getRandomColor = () => {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

  return (
    <CategoryContent>
        {categories.map((item, index) => {
            return (
            <CategoryItem key={index} style={{backgroundColor: `${getRandomColor()}`}}>
                <p>{item.name}</p>
                <img src={item.icons[0].url} alt=''/>
            </CategoryItem>
            )
        })}
    </CategoryContent>
  )
}

export default CategoryList