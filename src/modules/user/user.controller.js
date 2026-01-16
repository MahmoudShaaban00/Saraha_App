import { Message } from "../../../database/models/messages.js";




export const user = (req,res)=>{
    res.render('user', {userId : req.params.id, session : null});
}

export const sendMes = async (req,res)=>{
    req.body.user = req.params.id;
    await Message.insertMany([req.body]);
    res.redirect('/user/' + req.params.id);
}

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.redirect("/messages");
    }
    res.redirect("/login");
  });
};
