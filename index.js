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
    sub: "105557073386085183999", // must be unique to each user
    name: "Vinh",
    email: "honemlancuoiduockhong@gmail.com",
    aud: "47479090618-iqll0rpmik55bdg9kcjo6o7bju1ql9oo.apps.googleusercontent.com", // -> to be used in Custom Authentication as JWT Field
    iss: "https://accounts.google.com", // -> to be used in Custom Authentication as JWT Field
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  },
  privateKey,
  { algorithm: "RS256", keyid: "48a63bc4767f8550a532dc630cf7eb49ff397e7c" } // <-- Replace it with your kid. This has to be present in the JWKS endpoint.
);

console.log(token);
