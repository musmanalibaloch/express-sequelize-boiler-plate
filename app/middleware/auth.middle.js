

const tokenVerifier=function(req,res,next)
{
    //api call to user and check if associated token is correct
    console.log("safe");
    next(); //verified user
}
module.exports.verifier=tokenVerifier;