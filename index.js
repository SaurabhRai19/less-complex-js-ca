const core = require('@actions/core');
const github = require('@actions/github');

try {
    function ValidateEmail(mail) 
    {   
        console.log("In Function");
        console.log(String(mail).toLowerCase());
        console.log(res.test(String(mail).toLowerCase()));
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(mail).toLowerCase());
        
    //  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
    //   {
    //     return (true)
    //   }
    //    // alert("You have entered an invalid email address!")
    //     return (false)
    }
  // `who-to-greet` input defined in action metadata file
  const email = core.getInput('email');
  console.log(`Hello ${email}!`);
  var validornot= ValidateEmail(email);
  if(validornot == true){
    core.setOutput("message", "Valid Email and returned value is not string");
  }else{
    core.setOutput("message", "Invalid Email and returned value is not string");
  }
  if(validornot == "true"){
    core.setOutput("message", "Valid");
  }else{
    core.setOutput("message", "Invalid");
  }
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}