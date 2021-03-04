const axios = require("axios");
module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { data } = await axios.get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11048&page=${req.params.page}&count=${req.params.count}`,
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
  },
};
