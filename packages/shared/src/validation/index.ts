export const passwordValidation = {
    /**
     * Validates a password against security requirements
     * @param password The password to validate
     * @returns true if valid, false otherwise
     */
    isStrong: (password: string): boolean => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        return password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers;
    }
};