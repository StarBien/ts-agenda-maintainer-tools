
export const sqlEscapeSingleQuotes = (string : string) => {
    return string.replace("'", "''")
}