const crypto = require("crypto");

const isString = (value) => {
    return typeof value !== "string" ? JSON.stringify(value) : value;
};

const getHashValue = (data) => {
    return crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate;

    if (event) {
        candidate = event.partitionKey
            ? event.partitionKey
            : getHashValue(isString(event));
    }

    candidate = candidate ? isString(candidate) : TRIVIAL_PARTITION_KEY;

    return candidate.length > MAX_PARTITION_KEY_LENGTH
        ? (candidate = getHashValue(candidate))
        : candidate;
};
