const core = require('@actions/core');
const github = require('@actions/github');

try {
    function ValidateEmail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
      {
        return (true)
      }
       // alert("You have entered an invalid email address!")
        return (false)
    }
  // `who-to-greet` input defined in action metadata file
  const email = core.getInput('email');
  console.log(`Hello ${email}!`);
  var validornot= ValidateEmail(email);
  if(validornot == true){
    core.setOutput("message", "Valid Email");
  }else{
    core.setOutput("message", "Invalid Email");
  }
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}