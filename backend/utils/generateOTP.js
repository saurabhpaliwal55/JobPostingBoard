export const generateOTP = () =>{
    const otp = 10000 + Math.floor(Math.random()*900000);
    return otp.toString();
}