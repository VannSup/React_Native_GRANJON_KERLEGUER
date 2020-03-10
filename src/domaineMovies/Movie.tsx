import * as React from 'react';
import {Movie} from './tools/types';
import {getMovie} from './tools/get';
import {BASE_URL, API_KEY, APPLICATION_ID} from './tools/const';

const useMovie = (objectId: string) => {
  const [movie, setMovies] = React.useState<Movie>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    getMovie<Movie>(`/${objectId}`).then(data => {
      if (!cancel) {
        setMovies(data);
        setLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, [objectId]);

  return {movie, loading};
};

export default useMovie;
