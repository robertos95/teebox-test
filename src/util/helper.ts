export function getSiteIdsEnumDescription(enumType: object): string {
  return Object.entries(enumType)
    .filter(([key]) => !isNaN(Number(key))) // Filter to get only key-to-value mappings
    .map(([key, value]) => ` ${key}: ${value}`) // Format as "value: key"
    .join(
      '\n\
    ',
    );
}
