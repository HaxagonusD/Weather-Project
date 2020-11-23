import axios from "axios";
import dotenv from "dotenv";
import queryString from "query-string";

export default async (cityName: string) => {
  const queryObject = {
    appid: process.env.API_KEY,
    q: cityName,
    units: "imperial",
  };
  const endURL = queryString.stringify(queryObject);
  const apiCall = process.env.BASE_URL + endURL;
  return await axios.get(apiCall).then(
    ({ data }) => {
      return data;
    },
    (error) => {
      return undefined;
    }
  );
};
