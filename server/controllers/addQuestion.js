const axios = require("axios");
module.exports = {
  addQuestion: async (req, res) => {
    try {
      const { data } = await axios.post(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions`,
        {
          name: req.body.name,
          body: req.body.body,
          email: req.body.email,
          product_id: req.body.product_id * 1,
        },
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
