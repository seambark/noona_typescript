import React, { useState } from 'react'
import useGetCategories from '../../hooks/useGetCategories'
import { IconButton, InputBase, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchPageContent = styled("div") ({
  overflow: "hidden",
  height: "calc(100% - 60px)",
});
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

const SearchPage = () => {
  const { data } = useGetCategories();
  const categories = data?.categories.items || [];
  const [ keyword, setKeyword ] = useState<string>("");

  const getRandomColor = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
  }
  


   console.log(categories);
  return (
    <SearchPageContent>
      <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '30px' }}
          className='SearchInput'
      >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색어를 입력해 주세요."
            inputProps={{ 'aria-label': '노래검색' }}
            value={keyword} 
            onChange={handleSearchKeyword}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
      </Paper>
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
    </SearchPageContent>
  )
}

export default SearchPage