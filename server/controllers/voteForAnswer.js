const axios = require("axios");

const voteAnswer = async (req, res) => {
  try {
    console.log(req.params);
    const { data } = await axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/answers/${req.params.id}/helpful`,
      {},
      {
        headers: {
          Authorization: "6b62be346efafb380dd1297e6a12cbf825d65953",
        },
      }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.voteAnswer = voteAnswer;
