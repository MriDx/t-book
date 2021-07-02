import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BookRequests extends BaseSchema {
  protected tableName = 'book_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('teacher_slot_id').unsigned().references('id').inTable('teacher_slots')
      table.integer('student_id').unsigned().references('id').inTable('users')
      table.enum('status', ['requested', 'accepted', 'rejected']).defaultTo('requested')
      table.integer('action_by').nullable().unsigned().references('id').inTable('users')

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
