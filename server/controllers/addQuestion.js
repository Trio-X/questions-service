const axios = require("axios");
module.exports = {
  addQuestion: async (req, res) => {
    try {
      console.log("==>>>", {
        name: req.body.name,
        body: req.body.body,
        email: req.body.email,
        product_id: req.body.product_id,
      });
      let newData = {
        name: req.body.name,
        body: req.body.body,
        email: req.body.email,
        product_id: req.body.product_id * 1,
      };
      const { data } = await axios.post(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions`,
        newData,
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
  },
};