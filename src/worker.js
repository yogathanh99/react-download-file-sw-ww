/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */

export default () => {
  self.addEventListener("message", (e) => {
    const url = "http://localhost:1234/api/data";
    if (e.data === "Fetch") {
      fetch(`${url}/fetch`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          postMessage({ ciphertext: res });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.data === "GetUploads") {
      fetch(`${url}/get-uploads`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          postMessage({ uploads: res });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
