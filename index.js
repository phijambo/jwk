import jwt from "jsonwebtoken";
import fs from "fs";
// openssl genrsa -out privateKey.pem 2048
var privateKey = fs.readFileSync("privateKey.pem");
// openssl rsa -in privateKey.pem -pubout -out publicKey.pem
// var publicKey = fs.readFileSync("publicKey.pem");
// https://my-authz-server/.well-known/jwks.json -> publicKey to be used in Custom Authentication as JWK Endpoint.
// Check out below to convert PEM to JWKS

var token = jwt.sign(
  {
    iss: "https://securetoken.google.com/jambo-4e857",
    aud: "jambo-4e857",
    auth_time: 1703173063,
    user_id: "MF4NP9TjRKNPeJzDKpOg5dqPCUz1",
    sub: "MF4NP9TjRKNPeJzDKpOg5dqPCUz1",
    iat: 1703173064,
    exp: 1703176664,
    email: "phi@jambo.technology",
    email_verified: false,
    firebase: {
      identities: {
        email: ["phi@jambo.technology"],
      },
      sign_in_provider: "password",
    },
  },
  // {
  //   sub: "100598431157052412238", // must be unique to each user
  //   name: "Quảng Phi Trần",
  //   email: "tranquangphi1997@gmail.com",
  //   aud: "47479090618-iqll0rpmik55bdg9kcjo6o7bju1ql9oo.apps.googleusercontent.com", // -> to be used in Custom Authentication as JWT Field
  //   iss: "https://accounts.google.com", // -> to be used in Custom Authentication as JWT Field
  //   iat: Math.floor(Date.now() / 1000),
  //   exp: Math.floor(Date.now() / 1000) + 60 * 60,
  // },
  privateKey,
  { algorithm: "RS256", keyid: "032cc1cb289dd4626a435d72989ae43212defe78" } // <-- Replace it with your kid. This has to be present in the JWKS endpoint.
);

console.log(token);
