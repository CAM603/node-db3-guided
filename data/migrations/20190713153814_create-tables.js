exports.up = function(knex) {
  return knex.schema
    // Users Table
    .createTable('users', tbl => {
      tbl.increments(); // Primary key
      tbl.text('username', 128)
        .unique()
        .notNullable();
    })
    // Posts Table
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');

      // Foreign Key
      tbl.integer('user_id') // Foreign key must be the same type as the primary key it references
        .unsigned() // always include when referencing an integer primary key
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE') // Update everywhere
        .onDelete('CASCADE'); // Delete everywhere
        //.onDelete('RESTRICT') Do nothing

      // CREATING ANOTHER FOREIGN KEY
      tbl.integer('user_id') // Foreign key must be the same type as the primary key it references
        .unsigned() // always include when referencing an integer primary key
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
