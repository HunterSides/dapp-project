import { user } from "@dash-incubator/dapp-sdk";

// 'contract' ID should be hard coded by application developer
let contract = {
        $id: "",
    },
    definitions = {
        audio: {
            additionalProperties: false,
            indices: [{ properties: [{ $ownerId: "asc" }], unique: false }],
            properties: {
                description: {
                    type: "string",
                },
                encrypted: {
                    type: "boolean",
                },
                ipfs: {
                    additionalProperties: false,
                    properties: {
                        audio: {
                            type: "string",
                        },
                        banner: {
                            type: "string",
                        },
                        thumbnail: {
                            type: "string",
                        },
                    },
                    required: ["audio"],
                    type: "object",
                },
                keywords: {
                    items: {
                        type: "string",
                    },
                    type: "array",
                },
                name: {
                    type: "string",
                },
                transcoded: {
                    type: "boolean",
                },
                unlisted: {
                    type: "boolean",
                },
            },
            required: ["encrypted", "name", "transcoded", "unlisted"],
            type: "object",
        },
    },
    locators = {
        audio: "storagea.audio",
    };

const methods = {
    delete: async (documents) => {
        return await user.document.delete(documents);
    },
    read: async (query) => {
        return await user.document.read(locators.audio, query || {});
    },
    register: async () => {
        await user.apps.get("storagea", async () => {
            return contract["$id"]
                ? contract
                : await user.contract.register(definitions);
        });
    },
    save: async (documents) => {
        return await user.document.save(documents, locators.audio);
    },
};

export default methods;
