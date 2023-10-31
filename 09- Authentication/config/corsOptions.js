const whiteList = ["https://www.syndg.vercel.app", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    // !origin only for development
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
