Drop Schema If Exists travelnote Cascade;

Create Schema travelnote;

Set search_path To travelnote;

Create Table users(
    id serial Primary Key
);

Create Table notes(
    id serial Primary Key,
    created timestamp Default now(),
    updated timestamp Default now(),
    "isDel" boolean Default false,
    "isDraft" boolean Default false,
    userId integer References users On Delete Cascade,
    "text" text Not Null,
    title text Not Null,
    subtitle text,
    lng float,
    lat float,
    note jsonb
);

Create Table comments(
    id serial Primary Key,
    created timestamp Default now(),
    updated timestamp Default now(),
    "text" text Not Null,
    "isDel" boolean Default false,
    noteId integer References notes On Delete Cascade,
    "parentId" integer References comments On Delete Cascade
);

Insert Into comments ("text") Values ('Comment1'), ('Comment2'), ('Comment3');