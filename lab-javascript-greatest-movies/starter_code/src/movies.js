/* eslint no-restricted-globals: 'off' */

// ************
// Iteration 1: All rates average - Get the average of all rates with 2 decimals 
// ************

const ratesAverage = (movies) => {
  if (movies.length === 0) return 0;

  //reduce will get the sum of the array
  let totalSum = movies.reduce((sum, movie) => sum + Number(movie.rate), 0);
  let avg = totalSum / movies.length;

  return Number(avg.toFixed(2));
  // Number() is one way to transform a string into an array. 
  // toFixed() rounds the decimal houses of numbers
  // for more options, read this: https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
}

// LONGER SOLUTION for itr1 below, easier to read, 
// refactors into the above solution,
// this solution cannot be reused for itr2, as is

//  const ratesAverage = (movies) => {
//   if (movies.length === 0) {
//     return 0;
//   }

//   let totalSum = 0;
//   movies.forEach(movie => {
//     totalSum += Number(movie.rate);
//   })

//   const avg = totalSum / movies.length;
//   return Number(avg.toFixed(2));
//   //Number() transforms a string into an array. toFixed rounds the decimal houses of numbers
// }

// ************
// Iteration 2: Drama movies - Get the average of Drama Movies
// ************

const dramaMoviesRate = (movies) => {
  // .includes will return true or false if it finds a match
  let dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
return ratesAverage(dramaMovies);
}

// LONGER SOLUTION for itr2, refactors into above, calling itr1 
// const dramaMoviesRate = (movies) => {
//   let totalSum = 0;
//   let numberOfDramaMovies = 0;
//   movies.forEach(movie => {
//     if (movie.genre.includes('Drama')) {
//       totalSum += Number(movie.rate);
//       numberOfDramaMovies += 1;
//     }
//   });

//   if (movies.length === 0 || numberOfDramaMovies === 0) {
//     return 0;
//   }

//   const avg = totalSum / numberOfDramaMovies;
//   return Number(avg.toFixed(2));
// }

// ************
// Iteration 3: Ordering by duration - Order by time duration, ascending (in growing order)
// ************

const orderByDuration = (movies) => {
// CHECK if the passed in array is has been converted already 
let moviesWithMinDurations = movies;
if (typeof movies[0].duration == String) {
  moviesWithMinDurations = turnHoursToMinutes(movies); // reuse the turnHourstoMinutes function
}

return moviesWithMinDurations.sort((movie1, movie2) => {
    if (movie1.duration === movie2.duration) {
        return movie1.title.localeCompare(movie2.title);
      } else {
        return movie1.duration - movie2.duration;
      }
});
}

// ANOTHER SOLUTION for itr3, 
// more readable sort function for sorting strings

// const orderByDuration = (array) => {
//   let convertedArray = array;
//   if (typeof array[0].duration == String) {
//     convertedArray = turnHoursToMinutes(array); // reuse the turnHourstoMinutes function
//   }
//   convertedArray.sort((movie1, movie2) => { // sort them by duration and title
//     if (movie1.duration === movie2.duration) {
//       if (movie1.title > movie2.title) {
//         return 1;
//       } else {
//         return -1;
//       }
//     } else {
//       return movie1.duration - movie2.duration;
//     }
//   });
//   return convertedArray;
// };

// ************
// Iteration 4: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct
// ************

const howManyMovies = (movies) => {
// NOTE two lines below does exactly the same thing, just in two lines of code instead of one
// const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
// let speilbergDramaMovies = dramaMovies.filter(movie => movie.director === 'Steven Spielberg');

let speilbergDramaMovies = movies.filter(movie => movie.genre.includes("Drama") && movie.director == "Steven Spielberg");

return speilbergDramaMovies.length;
}

// ************
// Iteration 5: Alphabetic Order - Order by title and print the first 20 titles
// ************

const orderAlphabetically = (array) => {
  let orderedArray = array.sort((movie1, movie2) => { // sort by title
    return movie1.title.localeCompare(movie2.title); // same trick as used in itr3
  }).slice(0,20); // use slice to make the array shorter

  return orderedArray.map(movie => movie.title);
}

// SOLUTION WITHOUT localeCompare() trick to sort strings
// const orderAlphabetically = (array) => {
//     let orderedArray = array.sort((movie1, movie2) => { // sort by title
//         if (movie1.title > movie2.title) {
//             return 1;
//         } else {
//             return -1;
//         }
//     }).slice(0,20); // use slice to make the array shorter

//     return orderedArray.map(movie => movie.title);;
// }

// ************
// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
// ************

const turnHoursToMinutes = (movies) =>  {
return movies.map(movie => {
  // this splits the time into one or two elements, depending on the format
  // there are three possible valid formats we need to consider: '52min', '2h', or '2h 52min'
  let durationArray = movie.duration.split(" "); 
  let hours = 0;
  let min = 0;
  // this loop will run once or twice, depending on the format as decribed above
  durationArray.forEach(timeStr => {
    if (timeStr.includes('min')) {
      min += parseInt(timeStr, 10);
    } 
    if (timeStr.includes('h')) {
      hours += parseInt(timeStr, 10);
    }
  });
  
  // convert hours to min, and add it to the minute total
  min += (hours*60); 
  
  // nice syntax to do the same as whats commented out below
  // this makes a copy of the object, and then changes the duration attribute
  return {...movie, duration: min};
  // return {
  //   title: movie.title,
  //   year: movie.year,
  //   director: movie.director,
  //   duration: min,
  //   genre: movie.genre,
  //   rate: movie.rate
  // }
});
}

// ANOTHER SOLUTION for itr6, this is easier to read, 
// may make more sense for some students

// const turnHoursToMinutes = (movies)=>  {
//     return movies.map(movie => {
//       let strDuration = movie.duration
//       let duration

//       // When strDuration === "Xh XXmin"
//       if (strDuration.length === "Xh XXmin".length)
//         duration = strDuration[0]*60 + strDuration[3]*10 + strDuration[4]*1
//       // When strDuration === "Xh Xmin"
//       if (strDuration.length === "Xh Xmin".length)
//         duration = strDuration[0]*60 + strDuration[3]*1
//       // When strDuration === "XXmin"
//       if (strDuration.length === "XXmin".length)
//         duration = strDuration[0]*10 + strDuration[1]*1
//       // When strDuration === "Xh"
//       if (strDuration.length === "Xh".length)
//         duration = strDuration[0]*60

//       return {
//         title: movie.title,
//         year: movie.year,
//         director: movie.director,
//         duration: duration,
//         genre: movie.genre,
//         rate: movie.rate
//       }
//     })
//   }

// ************
// BONUS Iteration: Best yearly rate average - Best yearly rate average
// ************
const bestYearAvg = (movies) => {
if (movies.length === 0) return null;
let groupedMovies = movies.reduce((accumulator, current) => {
  // construct a unique key out of the properties we want to group by
  let key = current.year;

  // check if the key is already known
  if (typeof accumulator[key] === "undefined") {
    // init with an "empty" object
    accumulator[key] = {
      sum: 0,
      count: 0
    };
  }

  // sum up the values and count the occurences
  accumulator[key].sum += Number(current.rate);
  accumulator[key].count += 1;

  return accumulator;
}, {});

let avgGroupedMovies = Object.keys(groupedMovies)
  // iterate over the elements in <groupedMovies> and transform them into the "old" format
  .map((key) => {

    // construct the "old" format including the average value
    return {
      year: key,
      average: (groupedMovies[key].sum / groupedMovies[key].count)
    };
  });

avgGroupedMovies.sort((movie1, movie2) => { // sort them by average
  if (movie1.average === movie2.average) {
    return movie1.year.localeCompare(movie2.year);
  } else {
    return movie2.average - movie1.average;
  }
});

let bestMovie = avgGroupedMovies[0];

return `The best year was ${bestMovie.year} with an average rate of ${bestMovie.average}`;
};