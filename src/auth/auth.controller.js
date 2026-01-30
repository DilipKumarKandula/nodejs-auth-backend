const { registerUser,loginUser  } = require("./auth.service");


/**
 * Register user controller
 */
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Call service
    const newUser = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      data: {
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


const loginUserController = async (req, res)=>{
  try{
    const {email, password}=req.body

    // Validate input
    if(!email || !password){
      return res.status(400).json({
        message:"Email and password are required"
      })
    }

    // call service 
    const user = await loginUser(email, password);
     
    // Success response
    return res.status(200).json({
      message:"Login successful",
      data:user
    });

  } catch(error){
    return res.status(401).json(
      {
        message: error.message
      }
    )
  }
}


module.exports = {
  registerController,
  loginUserController
};
