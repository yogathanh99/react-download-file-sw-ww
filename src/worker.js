/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */

export default () => {
  self.addEventListener("message", (e) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=${process.env.API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        postMessage({ url: res.results });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
