// We need the basic_token configured on github actions, when we saved we remove the last 2 chars (==)
// dont forghet concat with the '{{ secrets.BASIC_TOKEN }}' + '=='
const args = require('node:process');
const axios = require("axios");

function basicToken() {
    let token = '';

    args.argv.forEach((val) => {
        let t = val.match(/basic_token=(.*)/gi) || [];
        if (t.length) {
            token = t[0]
        }
    });

    return token.replace(`basic_token=`, '') + '==' || null;
}

async function fetchPost(strUri, data, headers) {
    const response = await axios.post(strUri, data, { headers });
    return response;
}

async function fetchToken(strUri) {
    const headers = {
        "content-type": "application/json",
        Authorization: `Basic ${basicToken()}`,
        Accept: "application/json; version=3",
    };

    const response = await fetchPost(strUri, null, headers);

    switch (response.status) {
        case 201:
            return response.data;
        default:
            console.log(`[*] ${response.statusText}`);
            throw new Error(response.statusText);
    }
}

async function purge(strUri, token, data) {
    const headers = {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
        Accept: "application/json; version=3",
    };

    const response = await fetchPost(strUri, data, headers);
    return response.data;
}

async function performPurge(TOKEN_API_URL, PURGE_WILDCARD_URL) {
    try {
        const tokenRequest = await fetchToken(TOKEN_API_URL);
        const token = tokenRequest.token;

        console.log(
            await purge(PURGE_WILDCARD_URL, token, {
                urls: [
                    "https://www.robsongajunior.dev/*",
                    "https://www.robsonjunior.dev/*",
                    "https://www.rjr.dev/*"
                ],
                method: "delete",
            })
        );
    } catch (error) {
        console.error(error);
    }
}

(function main() {
    const API_HOST = 'api.azionapi.net';
    const TOKEN_API_URL = `https://${API_HOST}/tokens`;
    const PURGE_WILDCARD_URL = `https://${API_HOST}/purge/wildcard`;

    performPurge(TOKEN_API_URL, PURGE_WILDCARD_URL);
})();
