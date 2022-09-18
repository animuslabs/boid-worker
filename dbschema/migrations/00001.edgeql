CREATE MIGRATION m1woi3o7uo33byuxa22bxkkch5b2fkzdowv32omudroqwbvlle576q
    ONTO initial
{
  CREATE TYPE default::boidAccount {
      CREATE REQUIRED PROPERTY boid_id -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(13);
      };
  };
  CREATE TYPE default::fahRecord {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY time -> std::datetime;
      CREATE INDEX ON ((.name, .time));
      CREATE REQUIRED PROPERTY fahid -> std::int64;
      CREATE REQUIRED PROPERTY score -> std::int64;
      CREATE REQUIRED PROPERTY wus -> std::int64;
  };
};
