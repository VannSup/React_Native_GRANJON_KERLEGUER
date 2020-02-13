import * as React from 'react';
import {Movie, ApiResult} from './tools/types';
import {get} from './tools/get';

const useMovie = (objectId: string) => {
  const [movie, setMovies] = React.useState<Movie>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    get<Movie>(`/${objectId}`).then(data => {
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
