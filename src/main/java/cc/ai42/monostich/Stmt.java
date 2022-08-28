package cc.ai42.monostich;

public class Stmt {
    public static final String CREATE_TABLES = """
        CREATE TABLE IF NOT EXISTS metadata
        (
          name    TEXT   NOT NULL UNIQUE,
          value   TEXT   NOT NULL
        );

        CREATE TABLE IF NOT EXISTS poem
        (
          id        TEXT   PRIMARY KEY COLLATE NOCASE,
          title     TEXT   NOT NULL,
          stich     TEXT   NOT NULL,
          created   INT    NOT NULL
        );
        
        CREATE INDEX IF NOT EXISTS idx_poem_title ON poem(title);
        CREATE INDEX IF NOT EXISTS idx_poem_created ON poem(created);
        
        CREATE TABLE IF NOT EXISTS poemgroup
        (
          id        TEXT   PRIMARY KEY COLLATE NOCASE,
          title     TEXT   NOT NULL,
          poems     BLOB   NOT NULL,
          updated   INT    NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_poemgroup_title ON poemgroup(title);
        CREATE INDEX IF NOT EXISTS idx_poemgroup_updated ON poemgroup(updated);
        """;

    public static final String CURRENT_ID_NAME = "current-id";
    public static final String APP_CONFIG_NAME = "app-config";
    public static final String SEARCH_HISTORY = "search-history";

    public static final String INSERT_METADATA = """
        INSERT INTO metadata (name, value) VALUES (:name, :value);
        """;

    public static final String GET_METADATA = """
        SELECT value FROM metadata WHERE name = :name;
        """;

    public static final String UPDATE_METADATA = """
		UPDATE metadata SET value=:value WHERE name=:name;
		""";

    public static final String INSERT_POEM = """
        INSERT INTO poem (id, title, stich, created)
        VALUES (:id, :title, :stich, :created);
        """;

    public static final String INSERT_GROUP = """
        INSERT INTO poemgroup (id, title, poems, updated)
        VALUES (:id, :title, :poems, :updated);
        """;

    public static final String UPDATE_POEM = """
        UPDATE poem SET title=:title, stich=:stich WHERE id=:id;
        """;

    public static final String UPDATE_POEMGROUP = """
        UPDATE poemgroup SET title=:title, poems=:poems, updated=:updated
        WHERE id=:id;
        """;

    public static final String GET_POEM = """
        SELECT * FROM poem WHERE id = :id;
        """;

    public static final String GET_POEMGROUP = """
        SELECT * FROM poemgroup WHERE id = :id;
        """;

    public static final String GET_RECENT_POEMS = """
        SELECT * FROM poem ORDER BY created DESC LIMIT :limit;
        """;

    public static final String GET_RECENT_GROUPS = """
        SELECT * FROM poemgroup ORDER BY updated DESC LIMIT :limit;
        """;

    public static final String DELETE_POEM = """
        DELETE FROM poem WHERE id = :id;
        """;

    public static final String DELETE_POEMGROUP = """
        DELETE FROM poemgroup WHERE id = :id;
        """;

    public static final String SEARCH_POEMS = """
        SELECT * FROM poem WHERE title LIKE :title
        ORDER BY created DESC;
        """;

    public static final String SEARCH_GROUPS = """
        SELECT * FROM poemgroup WHERE title LIKE :title
        ORDER BY updated DESC;
        """;
}
