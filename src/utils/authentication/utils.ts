export function getBearerToken(authHeader?: string) {
    if (!authHeader) throw new Error('Invalid authorization header')
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length === 2 && tokenParts[0].toLowerCase() === 'bearer') {
        return tokenParts[1];
    }
    throw new Error('Invalid authorization header')
}
