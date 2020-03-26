exports.up = function(knex) {
    return knex.schema.createTable('users_tags', function (table){
      table.increments('id');
      table.string('tag').notNullable();

      table.integer('user_id').notNullable();

      table.foreign('user_id').references('id').inTable('users');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users_tags');
  };
  