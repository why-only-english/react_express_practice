function TodoColorbar({ handleColorClick, setFocusInput }) {
  const handleColorSelection = (color) => {
    handleColorClick(color);
    setFocusInput(true);
  };

  return (
    <div style={{ margin: '1px 0' }}>
      {['#ffffff', '#ef9a9a', '#fff59d', '#a5d6a7'].map((color) => (
        <span
          key={color}
          onClick={() => handleColorSelection(color)}
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            backgroundColor: color,
            borderRadius: '50%',
            margin: '0 10px',
            cursor: 'pointer',
            border: '1px solid #ccc',
          }}
        ></span>
      ))}
    </div>
  );
}

export default TodoColorbar;
