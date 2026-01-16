import QRCode from 'qrcode';
import { Message } from '../../../database/models/messages.js';

export const messages = async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }

  try {
    // URL البروفايل
    const url = req.protocol + '://' + req.get('host') + '/user/' + req.session.userId;

    // QR Code
    const qrCodeDataURL = await QRCode.toDataURL(url);

    // جلب الرسائل الخاصة بالمستخدم
    const messages = await Message.find({ user: req.session.userId });

    // رندر الصفحة
    res.render("messages", {
      session: req.session,
      url,
      qrCodeDataURL,
      messages
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
