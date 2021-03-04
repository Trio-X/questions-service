const axios = require("axios");

module.exports = {
  addAnswer: async (req, res) => {
    try {
      console.log("==>>>", {
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        photos: [req.body.photos],
      });
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
