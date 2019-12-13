import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  console.log(props);

  useEffect(() => {
    const movieToEdit = props.movies.find(
      movie => `${movie.id}` === props.match.params.id
    );
    console.log(movieToEdit);
    if (movieToEdit) setMovie(movieToEdit);
  }, [props.movies, props.match.params.id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
      console.log(e.target.name)
      value = [value]
      setMovie({...movie, [e.target.name]: [...movie.stars, value]});
    }
    setMovie({ ...movie, [e.target.name]: value });
    console.log(movie.stars);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={movie.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={movie.metascore}
        />
        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          value={movie.stars}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
