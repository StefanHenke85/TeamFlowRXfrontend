import { Auth } from 'aws-amplify'; // Nur Auth importieren
import Amplify from 'aws-amplify';

const awsconfig = {
  Auth: {
    region: "us-east-1", // Deine Cognito-Region
    userPoolId: "eu-central-1_2KIzVZrfR", // Deine User Pool ID
    userPoolWebClientId: "47efd0bgnod0p9p7n9510oin5g", // Deine App Client ID
  }
};

Amplify.configure(awsconfig);  // Amplify konfigurieren
