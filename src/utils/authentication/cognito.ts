import {CognitoJwtVerifier} from "aws-jwt-verify";
import {
    AttributeType,
    CognitoIdentityProviderClient,
    GetUserCommand,
    ListUsersCommand
} from "@aws-sdk/client-cognito-identity-provider";

function getCognitoValues() {
    return {
        userPoolId: process.env.COGNITO_USER_POOL_ID as string,
        clientId: process.env.COGNITO_CLIENT_ID as string,
        region: process.env.COGNITO_REGION as string,
    }
}

function createVerifier() {
    return CognitoJwtVerifier.create({
        userPoolId: getCognitoValues().userPoolId,
        clientId: getCognitoValues().clientId,
        tokenUse: "access",
    })
}

export async function verifyCognitoToken(token: string) {
    try {
        const verifier = createVerifier();
        return await verifier.verify(token);
    } catch (e) {
        console.error(e)
        throw new Error('Invalid access token');
    }
}

function createAttributeFinders(cognitoAttributes: Array<AttributeType>) {
    const attributes = new Map<string, string>();
    cognitoAttributes.forEach(attribute => {
        if (attribute.Name && attribute.Value) attributes.set(attribute.Name, attribute.Value)
    });

    function findMatchingAttribute(name: string) {
        return attributes.get(name);
    }

    function findRequiredMatchingAttribute(name: string) {
        const match = findMatchingAttribute(name);
        if (!match) {
            throw new Error(`No match for attribute ${name}`);
        }
        return match
    }

    return {findMatchingAttribute, findRequiredMatchingAttribute}
}

function createUser(cognitoAttributes: Array<AttributeType>) {
    const {findMatchingAttribute, findRequiredMatchingAttribute} = createAttributeFinders(cognitoAttributes);
    return {
        username: findRequiredMatchingAttribute('sub'),
        email: findRequiredMatchingAttribute('email'),
        role: findRequiredMatchingAttribute('custom:role'),
        firstName: findMatchingAttribute('given_name'),
        lastName: findMatchingAttribute('family_name'),
        organizationId: findMatchingAttribute('custom:organization_id')
    }
}

export async function getUserInfo(accessToken: string) {
    const client = new CognitoIdentityProviderClient({region: getCognitoValues().region});
    const input = {
        AccessToken: accessToken,
    };
    const command = new GetUserCommand(input);

    try {

        const response = await client.send(command);

        if (!response.UserAttributes) {
            throw new Error('User attributes not found');
        }
        return createUser(response.UserAttributes);
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function getUserInfoFromUsername(username: string) {
    const client = new CognitoIdentityProviderClient({region: getCognitoValues().region});
    const input = {
        UserPoolId: getCognitoValues().userPoolId,
        Filter: `sub = "${username}"`,
        Limit: 1
    }

    try {
        const command = new ListUsersCommand(input);
        const response = await client.send(command);
        const firstMatch = response.Users?.[0];

        if (!firstMatch || !firstMatch.Attributes) {
            throw new Error('User attributes not found');
        }
        return createUser(firstMatch.Attributes);
    } catch (e) {
        console.error(e)
        throw e
    }
}
