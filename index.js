const core = require('@actions/core');
const github = require('@actions/github');
let axios = require("axios");
const file= core.getInput('file');
const jsonFile = require(`${{ file }}`);
console.log(jsonFile);

try {
  async function azureAPICalling(){
  //getting and using important credentials
  const accessToken = core.getInput('AzureAccessToken');
  core.setSecret('accessToken');
  let organization = "DevOps-MBU";
  const project = core.getInput('azureprojectname');
  //getting and using a file input
  console.log(file);
  //let project = "DemoProject";
  let pipelineId = 78 || null;
  let runId = 971 || null;
  if (accessToken == null || accessToken === "") {
    throw new Error("Please provide an access token");
  } else {
    console.log("token is present!");
  }
  let url = `https://dev.azure.com/${organization}/${project}/_apis/pipelines?api-version=7.1-preview.1&=`;
  const request = await axios({
    url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // This!
      Authorization: `Basic ${Buffer.from(`PAT:${accessToken}`).toString(
        "base64"
      )}`,
      "X-TFS-FedAuthRedirect": "Suppress",
    },
  });
  let responsedata = request.data;
  //Print Names
  let arrOfObj=responsedata.value;
  arrOfObj.forEach(obj => console.log(obj.name));
  const jsonFormat = JSON.stringify(responsedata, null, 2);
  console.log(`Total Pipelines in MBU-Org's ${project}: `)
  console.log(jsonFormat);

    }
   azureAPICalling(); 
    function ValidateEmail(mail) 
    {   
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(mail).toLowerCase());
    }
  // `email` input defined in action metadata file
  const email = core.getInput('email');
  console.log(`Entered email is ${email}.`);
  var validornot= ValidateEmail(email); //validornot is of boolean type
  if(validornot === true){
    core.setOutput("message", "It is a Valid Email.");
  }else if(validornot === false){
   //core.setOutput("message", "It is Invalid Email.");
   core.setFailed("Invalid Email syntax");
}
  // Get the JSON webhook payload for the event that triggered the workflow
 // const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}