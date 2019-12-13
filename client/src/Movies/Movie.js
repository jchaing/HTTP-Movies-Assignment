import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    // console.log(this.state.movie)
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button
          onClick={() =>
            this.props.history.push(`/update-movie/${this.state.movie.id}`)
          }
        >
          Edit
        </button>
      </div>
    );
  }
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MovieCard from './MovieCard';

// const Movie = props => {
//   const [movie, setMovie] = useState('');

//   useEffect(() => {
//     const fetchMovie = id => {
//       axios
//         .get(`http://localhost:5000/api/movies/${id}`)
//         .then(res => {
//           setMovie(res.data)
//           console.log(movie);
//         })
//         .catch(err => console.log(err.response));
//     };

//     fetchMovie(props.match.params.id);

//     console.log(props.match.params.id);
//   }, []);

//   // componentWillReceiveProps(newProps) {
//   //   if (this.props.match.params.id !== newProps.match.params.id) {
//   //     this.fetchMovie(newProps.match.params.id);
//   //   }
//   // }

//   const saveMovie = () => {
//     const addToSavedList = props.addToSavedList;
//     addToSavedList(movie);
//   };

//   if (!movie) {
//     return <div>Loading movie information...</div>;
//   }
//   // console.log(this.state.movie)
//   return (
//     <div className="save-wrapper">
//       <MovieCard movie={movie} />
//       <div className="save-button" onClick={saveMovie}>
//         Save
//       </div>
//       <button onClick={() => props.history.push(`/update-movie/${movie.id}`)}>
//         Edit
//       </button>
//     </div>
//   );
// };

// export default Movie;
