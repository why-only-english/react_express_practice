import axios from "axios";

// const axios = require('axios');

axios
  .get("https://www.naver.com")
  .then((response) => {
    console.log(response);
    return response.data;
  })
  .then((data) => {
    console.log(data);
  });
