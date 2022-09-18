module default {
  type fahRecord {
    required property time -> datetime;
    required property name -> str;
    required property fahid -> int64;
    required property score -> int64;
    required property wus -> int64;
    index on ((.name,.time));
  }
  type boidAccount {
    required property boid_id -> str {
      constraint exclusive;
      constraint max_len_value(13);
    };

  }
}
