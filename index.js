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
    sub: "116546237406834305867", // must be unique to each user
    name: "Huỳnh Ái Tâm Như",
    email: "epshoesshop@gmail.com",
    aud: "763348850111-fmj2fadg9f435t471cc31fke8mvg0aqa.apps.googleusercontent.com", // -> to be used in Custom Authentication as JWT Field
    iss: "https://accounts.google.com", // -> to be used in Custom Authentication as JWT Field
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  },
  privateKey,
  { algorithm: "RS256", keyid: "91413cf4fa0cb92a3c3f5a054509132c47660937" } // <-- Replace it with your kid. This has to be present in the JWKS endpoint.
);

console.log(token);
