const handleErrorResponse = (res, error) => {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resource not found' });
    } else {
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = handleErrorResponse;
  