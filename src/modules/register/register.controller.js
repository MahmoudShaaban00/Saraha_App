import { User } from "../../../database/models/user.model.js"


export const register = (req,res)=>{
    res.render('register',{error : req.query.error, session:null});
}

export const handleRegister = async (req, res) => {
  let isUser = await User.findOne({ email: req.body.email });

  if (isUser) {
    return res.redirect('/register?error=Email already exists');
  }

  await User.create(req.body);
  res.redirect('/login');
};
