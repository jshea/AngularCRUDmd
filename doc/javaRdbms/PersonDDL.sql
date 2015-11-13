
-- Search and replace XXX with yourUserName before running this script. Also
-- you'll need to make the corresponding change in PersonDAO.java.

DROP TABLE XXX_angularcrud cascade constraints;
CREATE TABLE XXX_angularcrud (
    id           number(10)    Primary Key,
    firstName    varchar2(255) Not Null,
    lastName     varchar2(255) Not Null,
    street       varchar2(255),
    city         varchar2(255),
    state        char(2),
    zip          char(5),
    homePhone    char(10),
    mobilePhone  char(10),
    email        varchar2(255),
    website      varchar2(255)
);

DROP SEQUENCE XXX_angularcrud_seq;
CREATE SEQUENCE XXX_angularcrud_seq
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH 1
    INCREMENT BY 1
    CACHE 20;
