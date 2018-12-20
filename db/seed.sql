DROP DATABASE IF EXISTS note;
CREATE DATABASE note;

\c note
-- Each student has many subjects 
-- Each subject has many lessons 
-- Each lesson one note (text or image)

CREATE TABLE subject(
    id serial PRIMARY KEY,
    subjectname text UNIQUE NOT NULL
);

CREATE TABLE lesson(
    id serial PRIMARY KEY,
    subject_id int not null ,
    foreign key(subject_id) references subject on delete cascade,
    topic varchar,
    notes text
);

INSERT INTO subject(subjectname) VALUES('Statistics') ,('DataBase'),('English'),('Arabic'),('javaScribt'),('Biology'),('Computer Science');

INSERT INTO lesson(subject_id, topic ,notes) VALUES(1 ,'1.2 Data Classification' , 'The nature of the data you are working ind the probability of two events'),
(1,'4.1 Probability Distributions','The nature of the data you are working with will determine which statistical procedures can be used of data'),
(2,'1.2 initlaize','In Section 3.2, you learned how to find the probability of two events, A and B, occurring in sequence.'),
(2,'1.1 probability','firts steps : initlaize the project ,npm init ,npm install —save , extra ,npm install - - save express mustache-express pg-promise body-parser m');

--'When doing a study, it is important to know the kind of data involved. The nature of the data you are working with will determine which statistical procedures can be used. In this section, you will learn how to classify data by type and by level of measurement. Data sets can consist of two types of data: qualitative data and quantitative data.'
-- ,'You conduct a study of the number of calls a telemarketer makes in one day. The possible values of the random variable '),
--('Statistics','3.3 The Addition Rule' , 'In Section 3.2, you learned how to find the probability of two events, A and B, occurring in sequence. Such probabilities are denoted by P1A and B2. In this section, you will learn how to find the probability that at least one of two events will occur. Probabilities such as these are denoted by P1A or B) and depend on whether the events are mutually exclusive.'
--, 'firts steps : initlaize the project ,npm init ,npm install —save , extra ,npm install - - save express mustache-express pg-promise body-parser morgan method-override
--(when i run this ^^ list = ls to see node_modules which have all the data for all of what we downloaded)