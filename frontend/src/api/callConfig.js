import axios from 'axios'

export const call = async (url, type, data) => {
  return await axios({
    method: type,
    url: url,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + data.token,

    },
    data
  })
}
