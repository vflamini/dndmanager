CREATE TABLE items (
    item_id          INT NOT NULL PRIMARY KEY,
    item_name        VARCHAR(50),
    item_owner       VARCHAR(50),
    effects          VARCHAR(1000),
    equipped         VARCHAR(10),
    item_type        VARCHAR(50),
    is_hidden        VARCHAR(10),
    access_diff      VARCHAR(50),
    price            INT,
    amount           INT,
    notes            VARCHAR(1000)
);