const cors = require("cors");

let whitelist;
if (process.env.PRODUCTION_BUILD === "true") {
  whitelist = [
    "http://localhost:4200",
    "https://caremebd.com",
    "https://gripgalaxybd.com",
    "https://www.gripgalaxybd.com",
    "https://api.gripgalaxybd.com",
    "https://www.caremebd.com",
    "http://mimsms.com.bd",
    "https://careme-user-api.vercel.app/"
  ];
} else {
  whitelist = [
    "http://localhost:4200",
    "https://careme-user-api.vercel.app/"
  ];
}
const corsOptions = {
  origin: function (origin, callback) {
    if ( whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = (req, res, next) => {
  cors(corsOptions);
  next();
}
