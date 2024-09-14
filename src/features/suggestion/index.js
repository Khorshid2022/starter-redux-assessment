import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  // Task 18: Import the `selectSuggestion()` selector from the suggestion slice
  selectSuggestion
} from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  // Task 19: Call useSelector() with the selectSuggestion() selector
  // The component needs to access the `imageUrl` and `caption` properties of the suggestion object.
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const suggestion = useSelector(selectSuggestion);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      // Task 20: Dispatch the fetchSuggestion() action creator
      dispatch(fetchSuggestion());
    }
    loadSuggestion();
  }, [dispatch]);

  let render;
  if (loading) {
    render = <h3>Loading...</h3>;
  } else if (error) {
    render = <h3>Sorry, we're having trouble loading the suggestion.</h3>;
  } else if (suggestion && suggestion.imageUrl && suggestion.caption) {
    // Check if suggestion is available and contains both imageUrl and caption
    render = (
      <>
        <img alt={suggestion.caption} src={suggestion.imageUrl} />
        <p>{suggestion.caption}</p>
      </>
    );
  } else {
    render = <h3>No suggestion available.</h3>; // Fallback if no suggestion is loaded
  }


  return (
    <section className="suggestion-container">
      <h2>Suggestion of the Day</h2>
      {render}
    </section>
  );
}
