// Register new user
export const registerUser = async (req, res) => {
  console.log("called");
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false
    });

    // 🔴 FAULT INJECTION HERE
    throw new Error("Injected Registration Failure");

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};