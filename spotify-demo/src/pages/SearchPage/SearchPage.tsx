import React, { useEffect, useState } from 'react'
import useGetCategories from '../../hooks/useGetCategories'
import { IconButton, InputBase, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryList from './components/CategoryList';
import SearchWithKeywordPage from './SearchWithKeywordPage';
import { useLocation, useNavigate, useParams } from 'react-router';

const SearchPageContent = styled("div") ({
  overflow: "hidden",
  height: "calc(100% - 60px)",
});

let debounceTimer: ReturnType<typeof setTimeout>;
const SearchPage = () => {
  const { keyword: initialKeyword } = useParams<{ keyword: string }>();
  const [keyword, setKeyword] = useState(initialKeyword || "");
  // const [ searchInputVal, setSearchInputVal ] = useState<string>("");
  const navigate = useNavigate();
  // const location = useLocation();

  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value)

      // if(event.target.value === "") {
      //   navigate(`/search`);
      // } else {
      //   navigate(`/search/${encodeURIComponent(event.target.value)}`);
      // }  
  }

  useEffect(() => {
    setKeyword(initialKeyword || "");
  }, [initialKeyword]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const trimmed = keyword.trim();
        if (trimmed) {
          navigate(`/search/${encodeURIComponent(trimmed)}`);
        } else {
          navigate("/search");
        }
      }, 500);

      return () => clearTimeout(debounceTimer);
  }, [keyword, navigate]);
  // useEffect(() => {
  //   if(keyword === "" && searchInputVal !== "") {
  //     return setSearchInputVal("");
  //   }

  //   if(keyword !== "" && searchInputVal === "") {
  //     return setSearchInputVal(keyword)
  //   }

  //   if(location.pathname === "/search") {
  //     return setSearchInputVal("");
  //   }
  // },[keyword])
  
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
            onChange={(e) => setKeyword(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
      </Paper>
      {keyword && keyword.trim().length > 0 ? (
          <SearchWithKeywordPage keyword={keyword}/>
        ) : (
          <CategoryList />
        )
      }
      
      
    </SearchPageContent>
  )
}

export default SearchPage