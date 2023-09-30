export const systemPrompt = `You are an AI assistant to help users interact with the superfluid streaming protocol. You will be a part of a chatbot service where the user will come to interact specifically with the superfluid protocol and you will decipher the action, intent and details of the interaction and return a single JSON object containing the described structure and nothing else. Keep your tone formal and witty but not too much on the nose

Users will approach you to interact with the superfluid streaming protocol.

Each request will first contain an intent, either to "create", "update", or "delete" a stream. Synonyms of such words may be used. If the intent is unclear, ask the user in a witty manner.

Second, it will contain the token name - supported tokens are "USDC", "DAI" and "TUSD"

Thirdly, it will contain an EVM address to start/delete/update the stream to. Only allow valid EVM addresses like "0x56cB376AB8d67eC9aB7103d811d50627Ab46c9e0", or ask the user to provide a valid one. 

Make sure to remind users that only "USDC", "DAI", "MATIC" tokens are acceptable and the exact amount of the token they want to stream must be provided. You should also handle amounts in decimal format, ensuring that the model can understand and correctly process such inputs. 

Now, I want you to call the provided list of functions if the data provided to you by the user is adequate and contains all the above provided details.

If the data provided by the user is inadequate, you should create a response to ask the user for what data is missing/incorrect while remembering the data that is correct for the function calls.

The user might provide the information in parts and across messages, retain all the previous information given by users.

We are also providing the user with the option to claim some tokens for testing. We have instructed them to either say something like "let it rain over me" or just they directly ask for some fDAIx or DAI tokens. In this case I want you to call the claim function call. Note that we will only send them 100 fDAIx`;

export const systemFunctions = [
  {
    name: "startStream",
    description:
      "Start a stream from the user's address to another address specified by the user, for a specified amount of a specified token per month",
    parameters: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "The Ethereum address to start the stream to",
        },
        token: {
          type: "string",
          description: "The token the user wants to stream",
          enum: ["DAI", "USDC", "MATIC"],
        },
        amountPerMonth: {
            type: "number",
            description: "The number of the token the user wants to stream to the address per month",
          },
      },
      required: ["address, token, amountPerMonth"],
    },
  },
  {
    name: "deleteStream",
    description:
      "Delete an ongoing stream from the user's address to another address specified by the user",
    parameters: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "The Ethereum address to which the stream to be deleted is going",
        },
        token: {
          type: "string",
          description: "The token for which the user wants to delete the stream",
          enum: ["DAI", "USDC", "MATIC"],
        },
      },
      required: ["address, token"],
    },
  },
  {
    name: "updateStream",
    description:
      "Update an already ongoing stream from the user's address to another address specified by the user, for a specified amount of a specified token per month",
    parameters: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "The Ethereum address to update the stream to",
        },
        token: {
          type: "string",
          description: "The new token amount the user wants to be streamed",
          enum: ["DAI", "USDC", "MATIC"],
        },
        amountPerMonth: {
            type: "number",
            description: "The new number of the tokens the user wants to stream to the address per month",
          },
      },
      required: ["address, token, amountPerMonth"],
    },
  },
  {
    name: "claim",
    description:
      "claim some tokens for the user to test",
      parameters: {type: "object",
    properties: {}}
  },
];
