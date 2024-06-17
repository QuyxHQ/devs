let { VITE_ENDPOINT_URL, VITE_CLIENT_URL, VITE_DOCS_URL } = import.meta.env;

let ENDPOINT_URL = VITE_ENDPOINT_URL || 'http://localhost:3000';
let CLIENT_URL = VITE_CLIENT_URL || 'https://quyx.xyz';
let DOCS_URL = VITE_DOCS_URL || 'https://docs.quyx.xyz';

export default { ENDPOINT_URL, CLIENT_URL, DOCS_URL };
