type InsertStatement = {
   tableName: string;
   columns: string[];
   values: string[][];
   conflictClause: string | null;
};

export function consolidateInsertStatements(sqlStatements: string[]): string[] {
   //    const insertRegex =
   //       /INSERT INTO (\S+)\s+\(([^)]+)\)\s+VALUES\s*\(([^)]+)\)\s*(ON CONFLICT .*)?;?/gi;

   const insertRegex =
      /INSERT INTO (\S+)\s+\(([^)]+)\)\s+VALUES\s*\(\s*((?:(?:[^)(]+|\([^)]*\))+)\s*)\)\s*(ON CONFLICT .*)?;/gi;

   const groupedStatements: Record<string, InsertStatement> = {};

   for (const statement of sqlStatements) {
      const matches = statement.matchAll(insertRegex);

      for (const match of matches) {
         if (match) {
            const [, tableName, columns, values, conflictClause] = match;

            const columnList = columns.split(",").map((col) => col.trim());
            // Regex to match values but avoid separating between commas in a string value
            const valueList = values
               .split(/(?<=(?:'|\d|NULL|true|false|TRUE|FALSE)),/)
               .map((value) => value.trim());

            if (!groupedStatements[tableName]) {
               groupedStatements[tableName] = {
                  tableName,
                  columns: columnList,
                  values: [],
                  conflictClause: conflictClause ? conflictClause.trim() : null,
               };
            }

            groupedStatements[tableName].values.push(valueList);
         }
      }
   }

   const consolidatedStatements = Object.values(groupedStatements).map((group) => {
      const values = group.values.map((valueGroup) => `(${valueGroup.join(", ")})`).join(",\n    ");
      const conflictClause = group.conflictClause ? ` ${group.conflictClause}` : "";

      return `INSERT INTO ${group.tableName}\n(${group.columns.join(
         ", "
      )})\nVALUES\n    ${values}\n${conflictClause};`;
   });

   return consolidatedStatements;
}

// Example usage
const sqlStatements = [
   `
-- ASSOCIATE PRACTITIONERS TO BRANCHES
INSERT INTO medical.medics_branches (medic_id, branch_id)
VALUES (
    '0b344a82-d84a-4b0a-a841-bff674e0fa6c',
    '414b6ff8-4485-476d-8619-2de3a43a5e48'      -- CENTRO DE SALUD TOBALALA CLINI
)
ON CONFLICT DO NOTHING;

-- ADD NEW PRACTITIONERS AS PERSONS
INSERT INTO persons.persons (
    id,
    firstname, lastname, mother_maiden_name,
    birthdate,
    country, region, commune, city, street_name, street_number, rest_of_address,
    document_type, document_value, document_country,
    gender, deceased, phone,
    email
)
VALUES (
    '0b344a82-d84a-4b0a-a841-bff674e0fa6c',
    'Rodrigo Ignacio',
    'Alliende', 'Ferrada',
     NULL, 'CL', NULL, NULL, '', '', NULL, NULL,
    'RUT', '166614376', 'CL',
    NULL, 'false', '',
    NULL
)
ON CONFLICT DO NOTHING;


`,
   `INSERT INTO medical.clinics
      (id, name, has_online_booking, location_type)
      VALUES (
          'a0acfc67-0f71-413b-96fc-6435d2fabe7a',
          'CLINICA TEST 1',
          false,
          'AT_FACILITIES'
      ) ON CONFLICT DO NOTHING;`,
   `INSERT INTO medical.clinics
      (id, name, has_online_booking, location_type)
      VALUES (
          'cc784230-c86f-4f6c-abc0-0afdaebd9a67',
          'CLINICA TEST 2',
          false,
          'AT_FACILITIES'
      ) ON CONFLICT DO NOTHING;`,
   `INSERT INTO medical.clinics
      (id, name, has_online_booking, location_type)
      VALUES (
          '263ce20b-b404-463f-8412-6ded9d67a7e0',
          'CLINICA TEST 3',
          false,
          'AT_FACILITIES'
      ) ON CONFLICT DO NOTHING;
       
      INSERT INTO medical.medics_branches
(medic_id, branch_id)
VALUES
    ('0b344a82-d84a-4b0a-a841-bff674e0fa6c', '414b6ff8-4485-476d-8619-2de3a43a5e48'      -- CENTRO DE SALUD TOBALALA CLINI)
 ON CONFLICT DO NOTHING;`,
];

//   console.log(consolidateInsertStatements(sqlStatements).join('\n\n'));
