import React, { useEffect, useState } from 'react'
import useGetCategories from '../../hooks/useGetCategories'
import { IconButton, InputBase, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryList from './components/CategoryList';
import SearchWithKeywordPage from './SearchWithKeywordPage';
import { useNavigate, useParams } from 'react-router';

const SearchPageContent = styled("div") ({
  overflow: "hidden",
  height: "calc(100% - 60px)",
});


const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const [ searchInputVal, setSearchInputVal ] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => {
      setSearchInputVal(event.target.value)

      if(event.target.value === "") {
        navigate(`/search`);
      } else {
        navigate(`/search/${encodeURIComponent(event.target.value)}`);
      }  
  }

  useEffect(() => {
    if(searchInputVal === "" && keyword) {
      return setSearchInputVal(keyword);
    }
  },[keyword])
  
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
            value={searchInputVal} 
            onChange={handleSearchKeyword}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
      </Paper>
      {searchInputVal ? (
          <SearchWithKeywordPage />
        ) : (
          <CategoryList />
        )
      }
      
      
    </SearchPageContent>
  )
}

export default SearchPage