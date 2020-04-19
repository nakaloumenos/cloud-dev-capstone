import * as AWS from "aws-sdk";
// import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PetItem } from "../models/PetItem";
import { createLogger } from "../utils/logger";

const logger = createLogger("auth");

// const XAWS = AWSXRay.captureAWS(AWS);

export class PetAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly petsTable = process.env.PETS_TABLE
  ) {}

  async getAvailablePets(): Promise<PetItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.petsTable,
        KeyConditionExpression: "available = :available",
        ExpressionAttributeValues: {
          ":available": "true",
        },
      })
      .promise();

    logger.info(`Found ${result.Count} available pets for walking`);

    const items = result.Items;

    return items as PetItem[];
  }

  async createPet(pet: PetItem): Promise<PetItem> {
    await this.docClient
      .put({
        TableName: this.petsTable,
        Item: pet,
      })
      .promise();

    logger.info(`Saved new pet ${pet.petId} for user ${pet.userId}`);

    return pet;
  }
}
