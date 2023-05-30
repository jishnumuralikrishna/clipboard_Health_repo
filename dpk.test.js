const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const getHashValue = (data) => {
    return crypto.createHash("sha3-512").update(data).digest("hex");
};

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });

    it("Returns the partition key, if its provided", () => {
        const event = {
            partitionKey: "myKey",
        };

        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("myKey");
    });

    it("Generate a hash of event data, if partitionKey is not given", () => {
        const event = {
            data: "sampleText",
        };
        const data = JSON.stringify(event);
        const hashedValue = getHashValue(data);
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(hashedValue);
    });

    it("If candidate type is not string, stringify candidate value", () => {
        const event = {
            partitionKey: {
                value: "data",
            },
        };
        const stringifiedValue = JSON.stringify(event.partitionKey);
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(stringifiedValue);
    });

    it("If candidate doesn't exist, return partition key", () => {
        const event = null;
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("0");
    });

    it("If candidate length exceeds max value, generate hash of the candidate", () => {
        const candidate = "data".repeat(280);
        const event = {
            partitionKey: candidate,
        };
        const hashedValue = getHashValue(candidate);
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(hashedValue);
    });
});
