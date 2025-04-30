import Hashids from "hashids";

const hashids = new Hashids(process.env.NEXT_PUBLIC_HASHID_SALT,6)

export const encodeId = (id: string | number) => hashids.encodeHex(id.toString().replace(/-/g,""))
export const decodeId = (encoded: string) => hashids.decodeHex(encoded)