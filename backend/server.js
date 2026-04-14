require("dotenv").config({ path: require('path').join(__dirname, '.env') });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Hospital = require("./models/Hospital"); // ✅ move to top
const User = require("./models/User"); // ✅ Patient User model

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Password Validation Helper
const validatePassword = (pwd, userParam) => {
   if (!pwd) return null; // let existing logic handle missing password
   if (pwd.length < 8) return "Password must be at least 8 characters.";
   if (!/[a-zA-Z]/.test(pwd)) return "Password must contain at least 1 letter.";
   if (!/\d/.test(pwd)) return "Password must contain at least 1 number.";
   if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least 1 special character.";
   
   const lower = pwd.toLowerCase();
   if (userParam && lower.includes(userParam.toLowerCase())) return "Password must not contain your username.";
   if (lower.includes("caresphere")) return "Password must not contain the site name.";
   
   return null;
};

// MongoDB connection
mongoose.connect("mongodb+srv://CareSphereAdmin:CareSphere0612@cluster0.7hokh9h.mongodb.net/caresphere?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Check Email Config
if (process.env.EMAIL_PASS === 'your_16_digit_app_password_here') {
  console.log('\n======================================================');
  console.log('❌ FATAL WARNING: GMAIL NOT CONFIGURED CORRECTLY!');
  console.log('You must replace "your_16_digit_app_password_here"');
  console.log('with a real Google App Password in backend/.env');
  console.log('Emails WILL NOT SEND until you do this!');
  console.log('======================================================\n');
}

// ✅ GET hospitals with filter
app.get("/hospitals", async (req, res) => {
  try {
    const { oxygen, emergency } = req.query;

    let filter = { isApproved: true };

    if (oxygen) {
      filter["facilities.oxygen"] = oxygen === "true";
    }

    if (emergency) {
      filter.emergency = emergency === "true";
    }

    const hospitals = await Hospital.find(filter);

    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST hospital (Register)
app.post("/hospital", async (req, res) => {
  try {
    const { password, email, contactNumber, ...rest } = req.body;
    let hashedPassword = null;
    if (password) {
      const pErr = validatePassword(password, rest.username);
      if (pErr) return res.status(400).json({ error: pErr });
      hashedPassword = await bcrypt.hash(password, 10);
    }
    
    const hospital = new Hospital({
      ...rest,
      email,
      contactNumber,
      password: hashedPassword
    });
    
    await hospital.save();
    
    // SETUP NODEMAILER (Using Real Gmail SMTP via .env)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let message = {
        from: '"CareSphere Admin" <' + process.env.EMAIL_USER + '>',
        to: 'caresphereadmin@gmail.com',
        subject: `New Hospital Approval Required: ${hospital.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h2>New Hospital Registration Request</h2>
                <p>Hello Admin,</p>
                <p>A new hospital named <b>${hospital.name}</b> has registered on CareSphere and is pending your verification.</p>
                
                <div style="margin: 30px 0;">
                    <a href="http://localhost:5000/hospital/approve/${hospital._id}" style="padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                       Verify and Approve Hospital
                    </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 40px;" />
                <div style="font-size: 12px; color: #666; text-align: center;">
                    <p><strong>About CareSphere</strong></p>
                    <p>CareSphere is a real-time emergency facility tracking platform designed to save lives by instantly locating available oxygen, ICU beds, and ambulances.</p>
                    <p>Contact/Support: caresphereadmin@gmail.com</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('\n❌ =====================================');
            console.error('FAILED TO SEND EMAIL!');
            console.error('Reason: ' + err.message);
            console.error('Did you forget to put a real Google App Password in .env?');
            console.error('======================================\n');
            return;
        }
        console.log('\n✅ =====================================');
        console.log('REAL EMAIL SENT TO: ' + process.env.EMAIL_USER);
        console.log('Check your Gmail Inbox/Outbox!');
        console.log('======================================\n');
    });

    // Don't send back the hashed password
    const savedHospital = hospital.toObject();
    delete savedHospital.password;
    
    res.status(201).json(savedHospital);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Username already exists." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// ✅ POST login hospital
app.post("/hospital/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const hospital = await Hospital.findOne({ username });
    if (!hospital) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    const hospitalData = hospital.toObject();
    delete hospitalData.password;
    res.json(hospitalData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST hospital forgot password
app.post("/hospital/forgot-password", async (req, res) => {
   try {
      const { email } = req.body;
      const hospital = await Hospital.findOne({ email });
      if (!hospital) {
         return res.status(404).json({ error: "Email address not found for any hospital" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      hospital.resetOTP = otp;
      hospital.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
      await hospital.save();

      let transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS
           }
      });

      let mailOptions = {
           from: '"CareSphere Subsystem" <' + process.env.EMAIL_USER + '>',
           to: hospital.email,
           subject: 'CareSphere Hospital Password Reset',
           html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
                 <h2 style="color: #0284C7;">Hospital Admin Reset</h2>
                 <p>Facility: ${hospital.name}</p>
                 <p>Your OTP is:</p>
                 <h1 style="background: #E0F2FE; padding: 15px; border-radius: 5px; display: inline-block; letter-spacing: 5px; color: #0F172A;">${otp}</h1>
                 <p>Valid for 10 minutes.</p>
               </div>
           `
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: "OTP sent to hospital email successfully" });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send reset email." });
   }
});

// ✅ POST hospital reset password
app.post("/hospital/reset-password", async (req, res) => {
   try {
      const { email, otp, newPassword } = req.body;
      const hospital = await Hospital.findOne({ email });
      
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });
      if (hospital.resetOTP !== otp) return res.status(400).json({ error: "Invalid OTP code" });
      if (hospital.resetOTPExpiry < Date.now()) return res.status(400).json({ error: "OTP expired" });

      const pErr = validatePassword(newPassword, hospital.username);
      if (pErr) return res.status(400).json({ error: pErr });

      hospital.password = await bcrypt.hash(newPassword, 10);
      hospital.resetOTP = undefined;
      hospital.resetOTPExpiry = undefined;
      await hospital.save();

      res.json({ message: "Hospital password updated successfully" });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// ✅ POST user (Patient Register)
app.post("/user/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (password) {
       const pErr = validatePassword(password, username);
       if (pErr) return res.status(400).json({ error: pErr });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    const savedUser = user.toObject();
    delete savedUser.password;
    
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Username already exists." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// ✅ POST user login (Patient Login)
app.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    const userData = user.toObject();
    delete userData.password;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST user forgot password
app.post("/user/forgot-password", async (req, res) => {
   try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ error: "Email address not found in our system" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetOTP = otp;
      user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save();

      let transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS
           }
      });

      let mailOptions = {
           from: '"CareSphere Support" <' + process.env.EMAIL_USER + '>',
           to: user.email,
           subject: 'CareSphere Password Reset OTP',
           html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                 <h2 style="color: #DC2626;">Password Reset Request</h2>
                 <p>Hello ${user.username},</p>
                 <p>We received a request to reset your CareSphere password. Your One-Time Password (OTP) is:</p>
                 <h1 style="background: #F8FAFC; padding: 10px 20px; border-radius: 5px; display: inline-block; letter-spacing: 5px; color: #0F172A; margin: 10px 0;">${otp}</h1>
                 <p style="color: #64748B; font-size: 0.9em;">This code will expire magically in 10 minutes. If you did not request this, you can safely ignore this email.</p>
               </div>
           `
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: "OTP sent to email successfully" });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send reset email. Ensure SMTP is configured." });
   }
});

// ✅ POST user reset password
app.post("/user/reset-password", async (req, res) => {
   try {
      const { email, otp, newPassword } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
         return res.status(404).json({ error: "Session expired or user not found" });
      }

      if (user.resetOTP !== otp) {
         return res.status(400).json({ error: "Invalid OTP code" });
      }

      if (user.resetOTPExpiry < Date.now()) {
         return res.status(400).json({ error: "OTP has expired, please request a new one" });
      }

      if (newPassword) {
         const pErr = validatePassword(newPassword, user.username);
         if (pErr) return res.status(400).json({ error: pErr });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      user.resetOTP = undefined;
      user.resetOTPExpiry = undefined;
      await user.save();

      res.json({ message: "Password updated successfully" });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// ✅ PUT update user profile (Medical Data)
app.put("/user/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { name, age, gender, bloodGroup, allergies, chronicConditions } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(
         id,
         { name, age, gender, bloodGroup, allergies, chronicConditions },
         { new: true }
      );
      
      if (!updatedUser) {
         return res.status(404).json({ error: "User not found" });
      }
      
      const data = updatedUser.toObject();
      delete data.password;
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// ✅ GET user profile
app.get("/user/:id", async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }
      const data = user.toObject();
      delete data.password;
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// ✅ GET approve hospital (from email link)
app.get("/hospital/approve/:id", async (req, res) => {
   try {
      const hospital = await Hospital.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
      if (!hospital) {
         return res.status(404).send("<h1>Hospital not found</h1>");
      }
      res.send(`
         <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #059669;">Hospital Verified Successfully!</h1>
            <p><b>${hospital.name}</b> has been approved and is now live on the map.</p>
            <p>You can close this window.</p>
         </div>
      `);
   } catch (err) {
      res.status(500).send("<h1>Error approving hospital</h1>");
   }
});

// ✅ PUT update hospital capabilities
app.put("/hospital/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { facilities, emergency, contactNumber, bloodBank } = req.body;
      
      const updatedHospital = await Hospital.findByIdAndUpdate(
         id,
         { facilities, emergency, contactNumber, bloodBank },
         { new: true }
      );
      
      if (!updatedHospital) {
         return res.status(404).json({ error: "Hospital not found" });
      }
      
      const data = updatedHospital.toObject();
      delete data.password;
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// ✅ NEAREST hospital
app.get("/nearest-hospital", async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const { oxygen } = req.query;

    let hospitals = await Hospital.find({ emergency: true, isApproved: true });

    if (oxygen === "true") {
      hospitals = hospitals.filter(h => h.facilities.oxygen);
    }

    const getDistance = (lat1, lng1, lat2, lng2) => {
      return Math.sqrt(
        Math.pow(lat1 - lat2, 2) +
        Math.pow(lng1 - lng2, 2)
      );
    };

    hospitals.sort((a, b) => {
      const d1 = getDistance(lat, lng, a.coordinates.lat, a.coordinates.lng);
      const d2 = getDistance(lat, lng, b.coordinates.lat, b.coordinates.lng);
      return d1 - d2;
    });

    res.json(hospitals.slice(0, 3));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST contact form
app.post("/contact", async (req, res) => {
   try {
       const { name, email, phone, message } = req.body;
       
       let transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS
           }
       });

       let mailOptions = {
           from: '"CareSphere Contact Form" <' + process.env.EMAIL_USER + '>',
           to: 'caresphereadmin@gmail.com', // Always route to admin
           replyTo: email,
           subject: `New CareSphere Inquiry from ${name}`,
           html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                   <h2>New Contact Form Submission</h2>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #059669;">
                      <strong>Message:</strong><br/>
                      <span style="white-space: pre-wrap;">${message}</span>
                   </div>
               </div>
           `
       };

       await transporter.sendMail(mailOptions);
       console.log('✅ CONTACT EMAIL SENT FROM: ' + name);
       res.status(200).json({ success: true });
   } catch (err) {
       console.error("❌ CONTACT EMAIL FAILED:", err);
       res.status(500).json({ error: "Failed to send message" });
   }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});