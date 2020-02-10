--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE public.grades ALTER COLUMN "gradeId" DROP DEFAULT;
DROP SEQUENCE public."grades_gradeId_seq";
DROP TABLE public.grades;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: grades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grades (
    "gradeId" integer NOT NULL,
    name text NOT NULL,
    course text NOT NULL,
    grade integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: grades_gradeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."grades_gradeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: grades_gradeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."grades_gradeId_seq" OWNED BY public.grades."gradeId";


--
-- Name: grades gradeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grades ALTER COLUMN "gradeId" SET DEFAULT nextval('public."grades_gradeId_seq"'::regclass);


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grades ("gradeId", name, course, grade, "createdAt") FROM stdin;
1	Simon Peyton Jones	Haskell	100	2020-01-09 17:01:07.594342-08
2	Barbara Liskov	CLU	100	2020-01-09 17:01:07.594342-08
3	Rasmus Lerdorf	PHP	100	2020-01-09 17:01:07.594342-08
5	Mango Juice	Sweeet	100	2020-01-09 17:56:36.243428-08
6	Morning Coffee	Bean	99	2020-01-09 17:58:00.117603-08
15	In-N-Out	Double-Double	100	2020-01-10 13:19:32.854157-08
17	Subway	Sandwich	89	2020-01-10 15:17:54.137737-08
18	Peter Han	Back	99	2020-01-10 16:32:59.87881-08
19	Teter Tim	Testing	88	2020-02-10 14:53:40.579609-08
20	Teter Tim	Testing	12	2020-02-10 14:54:23.453769-08
21	Teter Tim	Testing	3	2020-02-10 15:13:43.926856-08
\.


--
-- Name: grades_gradeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."grades_gradeId_seq"', 21, true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

