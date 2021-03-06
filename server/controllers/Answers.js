const axios = require("axios");
module.exports = {
  getAnswers: async (req, res) => {
    try {
      const { data } = await axios.get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.question_id}/answers?count=${req.params.count}`,
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
  },
};
