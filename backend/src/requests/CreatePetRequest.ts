/**
 * Fields in a request to create a single TODO item.
 */
export interface CreatePetRequest {
  name: string;
  description: string;
  file: Buffer;
}
