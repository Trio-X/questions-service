const axios = require("axios");

module.exports = {
  addAnswer: async (req, res) => {
    try {
      const { data } = await axios.post(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.id}/answers`,
        {
          body: req.body.body,
          name: req.body.name,
          email: req.body.email,
          photos: [req.body.photos],
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
