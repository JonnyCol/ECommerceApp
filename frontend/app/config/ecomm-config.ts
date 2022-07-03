export default {

    // open id connect
    oidc: {
        // public identifier of client app
        clientId: "0oa333kg6iPgiwCTU5d7",
        // issuer of tokens (URL when authorizing with okta authorization server)
        issuer: "https://dev-53278489.okta.com/oauth2/default",
        // destination after users log in
        redirectUri: "https://localhost:4200/login/callback",
        //scopes provide access to info about user
        scopes: ["openid", "profile", "email"]
    }
}