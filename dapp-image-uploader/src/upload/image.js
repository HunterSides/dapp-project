import { user } from "@dash-incubator/dapp-sdk";

// 'contract' ID should be hard coded by application developer
let contract = {
        $id: "",
    },
    definitions = {
        image: {
            additionalProperties: false,
            indices: [{ properties: [{ $ownerId: "asc" }], unique: false }],
            properties: {
                compressed: {
                    type: "boolean",
                },
                description: {
                    type: "string",
                },
                encrypted: {
                    type: "boolean",
                },
                ipfs: {
                    additionalProperties: false,
                    properties: {
                        gallery: {
                            items: {
                                type: "string",
                            },
                            type: "array",
                        },
                        image: {
                            type: "string",
                        },
                    },
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
                unlisted: {
                    type: "boolean",
                },
            },
            required: ["compressed", "unlisted"],
            type: "object",
        },
    },
    locators = {
        image: "storagei.image",
    };

const methods = {
    delete: async (documents) => {
        return await user.document.delete(documents);
    },
    read: async (query) => {
        return await user.document.read(locators.image, query || {});
    },
    register: async () => {
        await user.apps.get("storagei", async () => {
            return contract["$id"]
                ? contract
                : await user.contract.register(definitions);
        });
    },
    save: async (documents) => {
        return await user.document.save(documents, locators.image);
    },
};

export default methods;
