import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StudentDetails extends BaseSchema {
  protected tableName = 'student_details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('student_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('branch')
      table.string('semester')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
