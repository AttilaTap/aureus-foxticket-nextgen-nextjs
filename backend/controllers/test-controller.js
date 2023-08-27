export const isAvailable = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in isAvailable:", error);
    next(error);
  }
};
