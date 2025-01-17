/**
 * 
 * Placeholder for modelling the DB entities
 * 
 * Here we should define the tables types, (using Zod to seize the
 * type validation methods) this will allow us to be able to generate
 * dynamic SQL statements rather than using templates
 * 
 */

type InsertStatement = {
	tableName: string
	columns: string[]
	values: string[][]
	conflictClause: string | null
};

type UpdateStatement = {
	tableName: string
	column: string
	value: string
	condition: string
}

type DeleteStatement = {
	tableName: string
	condition: string
}
  
