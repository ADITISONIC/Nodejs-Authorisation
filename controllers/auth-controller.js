const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newlyCreatedUser.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
const loginUser = async(req,res)=>{
    try{
     const {username,password} = req.body
     const user = await User.findOne({username})
     if(!user){
        return res.status(400).json({
           success:false,
           message:"fail"
        })
     }
     const ispassword = await bcrypt.compare(password,user.password)
     if(!ispassword){
        return res.status(400).json({
          success: false,
          message: "fail",
        }); 
     }
     
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"failed"
        })
    }
}
module.exports = { registerUser,loginUser };
