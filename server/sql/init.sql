Create Table notes(
    id serial Primary Key
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