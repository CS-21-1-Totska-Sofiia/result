import { v4 as uuidv4 } from "uuid";

export const generateKey = () => {
    const rowKey = uuidv4();
    return rowKey;
}