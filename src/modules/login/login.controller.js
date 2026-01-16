import { User } from "../../../database/models/user.model.js";

export const login = (req, res) => {
    res.render('login',{error:req.query.error, session:null});
};

export const handleLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.password !== req.body.password) {
    return res.redirect("/login?error=Invalid email or password");
  }

  req.session.userId = user._id;
  req.session.name = user.name;
  req.session.isLoggedIn = true;

  res.redirect("/messages");
};
