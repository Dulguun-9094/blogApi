const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("хүчингүй Токен !!");
      } else {
        req.user = user;
        if (user && user.isAdmin) {
          next();
        } else {
          res.status(403).json("Зөвхөн админууд энэ үйлдлийг гүйцэтгэх боломжтой.");
        }
      }
    });
  } else {
    return res.status(401).json("Login хийнэ үү !!");
  }
}

module.exports = verify;
