function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
      placeholder="할 일 검색"
      style={{
        padding: '10px',
        width: '300px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        color: '#333',
      }}
    />
  );
}

export default SearchBar;
