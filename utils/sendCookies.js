import jwt from 'jsonwebtoken'

export const sendCookic = (user, res, message, statusCode = 200) => {
  
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .status(statusCode)
      .cookie("token",token , {
        expires: new Date(Date.now() + process.env.JWT_EXPIRE*24*60*60*1000), // Set expiration time
        httpOnly: true,
        sameSite: "None",
        secure:true,
      })
      .json({
        success: true,
        message,
        token: token,
        user
      });
  };
  