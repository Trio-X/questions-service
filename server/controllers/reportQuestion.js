const axios = require("axios");

const reportQuestion = async (req, res) => {
  try {
    const { data } = await axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.id}/report`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.reportQuestion = reportQuestion;
