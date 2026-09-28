import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

 const secret = "SuperMan@123";

 function createTokenForUser(user) {
    const payload= {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
         role: user.role,
    };
    const token = sign(payload, secret);
    return token;
 }

  function validateToken(token){
     const payload = verify(token , secret);
      return payload;
  }
   
   export default {
    createTokenForUser,
     validateToken,
   };
