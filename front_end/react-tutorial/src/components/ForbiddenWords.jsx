import { useState } from 'react';

function ForbiddenWords() {
  const [forbiddenWords, setForbiddenWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const addForbiddenWord = () => {
    const trimmedWord = newWord.trim();
    if (trimmedWord !== '') {
      setForbiddenWords([...forbiddenWords, trimmedWord]);
      setNewWord('');
    }
  };

  const addFilteredResult = () => {
    if (userInput.trim() !== '') {
      const filteredText = filterForbiddenWords(userInput);
      setFilteredResults([...filteredResults, filteredText]);
      setUserInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addForbiddenWord();
    }
  };

  const handleKeyPressForInput = (e) => {
    if (e.key === 'Enter') {
      addFilteredResult();
    }
  };

  const filterForbiddenWords = (text) => {
    let filteredText = text;
    forbiddenWords.forEach((word) => {
      const regExp = new RegExp(word.split('').join('\\s*'), 'gi');
      filteredText = filteredText.replace(regExp, '**');
    });
    return filteredText;
  };

  return (
    <div>
      {/* 금지어 추가 부분 */}
      <h2>금지어 추가</h2>
      <input
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="금지어 입력"
      />
      <button onClick={addForbiddenWord}>Add</button>
      {/* 금지어 목록 표시 */}
      <h3>현재 금지어 목록:</h3>
      <ul>
        {forbiddenWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      {/* 사용자 입력 부분 */}
      <h2>사용자 입력 필터링</h2>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPressForInput}
        placeholder="텍스트 입력"
      />
      <button onClick={addFilteredResult}>추가</button> {/* 필터링 버튼 추가 */}
      {/* 필터링된 결과 목록 표시 */}
      <h3>필터링된 결과 목록:</h3>
      <ul>
        {filteredResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default ForbiddenWords;
