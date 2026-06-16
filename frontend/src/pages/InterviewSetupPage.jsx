import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestionOptions, getQuestions } from '../services/interviewService.js';

function InterviewSetupPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const result = await getQuestionOptions();
        setCategories(result.data.categories);
        setDifficulties(result.data.difficulties);
        setCategory(result.data.categories[0] || '');
        setDifficulty(result.data.difficulties[0] || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setOptionsLoading(false);
      }
    };

    loadOptions();
  }, []);

  const handleStart = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await getQuestions(category, difficulty);

      navigate('/interview', {
        state: {
          questions: result.data,
          category,
          difficulty,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) {
    return (
      <section className="page">
        <p>Loading interview options...</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Interview Setup</h1>
      <p>Select a category and difficulty to start your practice interview.</p>

      {error && <p className="error-message">{error}</p>}

      <form className="form" onSubmit={handleStart}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={loading}
        >
          {difficulties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Starting interview...' : 'Start Interview'}
        </button>
      </form>
    </section>
  );
}

export default InterviewSetupPage;
