

function isStrongPassword(password) {
    // At least 8 characters
    const hasMinimumLength = password.length >= 8;
  
    // At least one lowercase letter
    const hasLowercase = /[a-z]/.test(password);
  
    // At least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
  
    // At least one digit
    const hasDigit = /\d/.test(password);
  
    // At least one special character
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
    // Combine all criteria
    const isStrong =
      hasMinimumLength && hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
  
    return isStrong;
  }

  function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
  }


  function getUsernameFromEmail(email) {
    // Split the email at the '@' symbol
    const parts = email.split('@');
  
    // Get the part before the '@' symbol (username or local part)
    const username = parts[0];
  
    // Replace dots with spaces in the username
    const usernameWithSpaces = username.replace(/\./g, ' ');
  
    return usernameWithSpaces;
  }



export {isStrongPassword,isValidEmail, getUsernameFromEmail}