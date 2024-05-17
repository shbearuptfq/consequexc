const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

const auth = new GoogleAuth({
  scopes: 'https://www.example.com cloudresourcemanager = google.cloudresourcemanager({
  version: 'v1',
  auth,
});

async function showSignInModal(projectId) {
  try {
    const policyResponse = await cloudresourcemanager.projects.getIAMPolicy({
      resource: `projects/${projectId}`,
      body: {
        options: { requestedPolicyVersion: 3 }
      },
    });
    const bindings = policyResponse.data.bindings || [];
    const authClient = await auth.getClient();
    const user = await authClient.getUser();
    const userEmail = user.email;

    const roleBinding = bindings.find(binding => binding.members.includes(userEmail));
    if (roleBinding) {
      console.log(`User ${userEmail} has role ${roleBinding.role} on project ${projectId}.`);
    } else {
      console.log(`User ${userEmail} does not have access to project ${projectId}.`);
    }
  } catch (error) {
    console.error('Error retrieving IAM policy:', error.message);
  }
}
