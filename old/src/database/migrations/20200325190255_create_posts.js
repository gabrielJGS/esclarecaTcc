exports.up = function(knex) {
    return knex.schema.createTable('posts', function (table){
      table.increments('id');
      table.string('titulo').notNullable();
      table.string('descricao').notNullable();
      
      table.integer('user_id').notNullable();

      table.foreign('user_id').references('id').inTable('users');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('posts');
  };
  