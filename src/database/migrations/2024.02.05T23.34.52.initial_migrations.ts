import {Migration} from "../connectors/migrators";


export const up: Migration = async (params) => {
    return params.context.query(`SET check_function_bodies = false
;

CREATE TABLE DATAERROR(
  ID serial NOT NULL,
  NAME varchar(150),
  EMAIL varchar(150),
  AGE integer,
  ROLE varchar,
  PASSWORD  varchar(200),
  STATUS boolean NOT NULL,
  CREATED timestamp NOT NULL,
  UPDATED timestamp NOT NULL,
  DOCUMENT_ID integer NOT NULL,
  CONSTRAINT DATAERROR_pkey PRIMARY KEY(ID)
);

CREATE TABLE DOCUMENT(
  ID serial NOT NULL,
  NAME varchar(200) NOT NULL,
  URL varchar(500) NOT NULL,
  STATUS boolean NOT NULL,
  CREATED timestamp NOT NULL,
  UPDATED timestamp NOT NULL,
  CONSTRAINT DOCUMENT_pkey PRIMARY KEY(ID)
);

CREATE TABLE ERROR(
  ID serial NOT NULL,
  NAME_ERROR varchar(150),
  EMAIL_ERROR varchar(150),
  AGE_ERROR integer,
  ROLE_ERROR varchar,
  PASSWORD_ERROR  varchar(200),
  STATUS boolean NOT NULL,
  CREATED timestamp NOT NULL,
  UPDATED timestamp NOT NULL,
  DATAERROR_ID integer NOT NULL,
  CONSTRAINT ERROR_pkey PRIMARY KEY(ID)
);

CREATE TABLE USERS(
  ID serial NOT NULL,
  NAME varchar(150) NOT NULL,
  EMAIL varchar(150) NOT NULL,
  AGE integer NOT NULL,
  ROLE varchar NOT NULL,
  PASSWORD  varchar(200) NOT NULL,
  STATUS boolean NOT NULL,
  CREATED timestamp NOT NULL,
  UPDATED timestamp NOT NULL,
  CONSTRAINT USERS_pkey PRIMARY KEY(ID),
  CONSTRAINT USERS_EMAIL_key UNIQUE(EMAIL)
);

ALTER TABLE DATAERROR
  ADD CONSTRAINT DATAERROR_DOCUMENT_ID_fkey
    FOREIGN KEY (DOCUMENT_ID) REFERENCES DOCUMENT (ID);

ALTER TABLE ERROR
  ADD CONSTRAINT ERROR_DATAERROR_ID_fkey
    FOREIGN KEY (DATAERROR_ID) REFERENCES DATAERROR (ID);
`);
};
export const down: Migration = async (params) => {
    return params.context.query(`RAISE EXCEPTION 'down migration not implemented'`);
};
