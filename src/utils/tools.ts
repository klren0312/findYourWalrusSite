/**
 * 将objectId转换为base36编码
 * @param str objectid
 * @returns base36编码
 */
export const addressToBase36 = (str: string) => {
  const hex = BigInt(str)
  return hex.toString(36)
}