const axios = require("axios");

const reportQuestion = async (req, res) => {
  try {
    console.log("==>>", req.params);
    const { data } = await axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.id}/report`,
      {},
      {
        headers: {
          Authorization: process.env.TOKEN,
        },
      }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.reportQuestion = reportQuestion;