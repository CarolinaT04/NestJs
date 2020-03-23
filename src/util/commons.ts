
import { ObjectID } from "mongodb";
import { ObjectID as BSonObjectID } from "bson";

export enum GlobalStrOptions {
    DEFAULT_STR = "n/a"
}

/**
 * Convert all the first character of the given string uppercase.
 *
 * @param text
 */
export function ucFirst(text: string) {
    text = text.toLowerCase()
               .split(" ")
               .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
               .join(" ");

    return text;
}


/**
 * Converts string or given value into boolean representation.
 *
 * @param value
 */
export function getBoolean(value: any): boolean {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}
/**
 * Type Alias for the TypeORM ObjectID
 */
export type MongoObjectID = ObjectID;
/**
 * Convert the ref enum into a string of all the options.
 *
 * @param enumDef
 * @param separator
 * @return {string}
 */
export function enumImplode(enumDef: any, separator: string = ","): string {
    return Object.keys(enumDef)
                 .map((property) => `${property}=${enumDef[property]}`)
                 .join(separator);
}

/**
 * Convert the string representation of the MongoDB ObjectID into MongoObjectID.
 *
 * @param strObjectId
 */
export function strToMongoObjectID(strObjectId: string): MongoObjectID {
    return new BSonObjectID(strObjectId) as unknown as MongoObjectID;
}