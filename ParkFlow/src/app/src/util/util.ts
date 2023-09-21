export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const getCountryCode = (
    phoneNumber: string,
    formattedPhoneNumber: string
) => {
    const regex = new RegExp(phoneNumber, "g");
    return formattedPhoneNumber.replace(regex, "");
};
