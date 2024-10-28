import TodoApp from './components/PlaceholderApp';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#d0e8ff',
        // minHeight: '100vh',
      }}
    >
      {/* TodoApp 컴포넌트 */}
      <TodoApp />
    </div>
  );
}

export default App;
