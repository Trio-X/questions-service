const axios = require("axios");
const { token } = require("../index");

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { data } = await axios.get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11048&page=${req.params.page}&count=${req.params.count}`,
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
