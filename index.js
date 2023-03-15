const core = require('@actions/core');
const github = require('@actions/github');

try {
    function ValidateEmail(mail) 
    {   
        console.log(String(mail).toLowerCase());
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(res.test(String(mail).toLowerCase()));
        return res.test(String(mail).toLowerCase());
    }
  // `who-to-greet` input defined in action metadata file
  const email = core.getInput('email');
  console.log(`Hello ${email}!`);
  var validornot= ValidateEmail(email);
  console.log("Validornot Variable");
  console.log(validornot);
  console.log(typeof validornot);
  if(validornot === true){
    core.setOutput("message", "Valid Email and returned value is not string");
  }else if(validornot === false){
    core.setOutput("message", "Invalid Email and returned value is not string");
    core.setFailed("Invalid Email syntax");
}
//   if(validornot == "true"){
//     core.setOutput("message", "Valid");
//   }else if(validornot === false){
//     core.setOutput("message", "Invalid");
//   }
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}