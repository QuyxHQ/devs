let { ENDPOINT_URL } = import.meta.env;

ENDPOINT_URL = ENDPOINT_URL || "http://localhost:8085";

export default { ENDPOINT_URL };
