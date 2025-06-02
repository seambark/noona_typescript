import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from "react-router";
import Loading from './common/components/Loading';
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(() => import("./pages/SearchPage/SearchWithKeywordPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistDetailPage"));
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"));

// 0. 사이드바(플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 검색 페이지 /search
// 3. 검색 결과 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일) 플레이리스트 보여주는 페이지 /playlist

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage/>} />
          <Route path="playlist/:id" element={<PlaylistDetailPage/>} />
          <Route path="playlist" element={<PlaylistPage/>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
