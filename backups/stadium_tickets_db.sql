--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: booking_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.booking_status AS ENUM (
    'reserved',
    'confirmed',
    'cancelled'
);


ALTER TYPE public.booking_status OWNER TO postgres;

--
-- Name: enum_events_event_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_events_event_status AS ENUM (
    'open',
    'closed'
);


ALTER TYPE public.enum_events_event_status OWNER TO postgres;

--
-- Name: enum_parking_disabled_spaces_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_parking_disabled_spaces_type AS ENUM (
    'missing',
    'blocked'
);


ALTER TYPE public.enum_parking_disabled_spaces_type OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'moderator'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

--
-- Name: enum_zone_disabled_seats_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_zone_disabled_seats_type AS ENUM (
    'missing',
    'blocked'
);


ALTER TYPE public.enum_zone_disabled_seats_type OWNER TO postgres;

--
-- Name: enum_zone_resources_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_zone_resources_type AS ENUM (
    'image',
    'video'
);


ALTER TYPE public.enum_zone_resources_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: booking_parking_spaces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_parking_spaces (
    booking_id integer NOT NULL,
    p_space_id integer NOT NULL
);


ALTER TABLE public.booking_parking_spaces OWNER TO postgres;

--
-- Name: booking_seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_seats (
    z_seat_id integer NOT NULL,
    booking_id integer NOT NULL,
    person_name character varying(50) NOT NULL,
    identification_number character varying(15) NOT NULL
);


ALTER TABLE public.booking_seats OWNER TO postgres;

--
-- Name: event_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_bookings (
    booking_id integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    zone_id integer NOT NULL,
    event_id integer NOT NULL,
    total_amount integer NOT NULL,
    status public.booking_status NOT NULL,
    payment_made boolean NOT NULL,
    person_name character varying(50) NOT NULL
);


ALTER TABLE public.event_bookings OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    name character varying(255) NOT NULL,
    poster_url text NOT NULL,
    date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    event_status public.enum_events_event_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_event_id_seq OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events.event_id;


--
-- Name: parking_disabled_spaces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_disabled_spaces (
    p_space_id integer NOT NULL,
    space_number integer NOT NULL,
    space_row character varying(255) NOT NULL,
    type public.enum_parking_disabled_spaces_type,
    p_floor_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.parking_disabled_spaces OWNER TO postgres;

--
-- Name: parking_disabled_spaces_p_space_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_disabled_spaces_p_space_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_disabled_spaces_p_space_id_seq OWNER TO postgres;

--
-- Name: parking_disabled_spaces_p_space_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_disabled_spaces_p_space_id_seq OWNED BY public.parking_disabled_spaces.p_space_id;


--
-- Name: parking_floors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_floors (
    p_floor_id integer NOT NULL,
    floor_number integer NOT NULL,
    spaces_per_row integer NOT NULL,
    num_of_rows integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.parking_floors OWNER TO postgres;

--
-- Name: parking_floors_p_floor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_floors_p_floor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_floors_p_floor_id_seq OWNER TO postgres;

--
-- Name: parking_floors_p_floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_floors_p_floor_id_seq OWNED BY public.parking_floors.p_floor_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role public.enum_users_role,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: zone_disabled_seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zone_disabled_seats (
    z_seat_id integer NOT NULL,
    seat_number integer NOT NULL,
    seat_row character varying(255) NOT NULL,
    type public.enum_zone_disabled_seats_type,
    zone_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.zone_disabled_seats OWNER TO postgres;

--
-- Name: zone_disabled_seats_z_seat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zone_disabled_seats_z_seat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zone_disabled_seats_z_seat_id_seq OWNER TO postgres;

--
-- Name: zone_disabled_seats_z_seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zone_disabled_seats_z_seat_id_seq OWNED BY public.zone_disabled_seats.z_seat_id;


--
-- Name: zone_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zone_resources (
    resource_id integer NOT NULL,
    resource_url text NOT NULL,
    zone_id integer NOT NULL,
    type public.enum_zone_resources_type,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.zone_resources OWNER TO postgres;

--
-- Name: zone_resources_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zone_resources_resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zone_resources_resource_id_seq OWNER TO postgres;

--
-- Name: zone_resources_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zone_resources_resource_id_seq OWNED BY public.zone_resources.resource_id;


--
-- Name: zone_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zone_types (
    z_type_id integer NOT NULL,
    type character varying(255) NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.zone_types OWNER TO postgres;

--
-- Name: zone_types_z_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zone_types_z_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zone_types_z_type_id_seq OWNER TO postgres;

--
-- Name: zone_types_z_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zone_types_z_type_id_seq OWNED BY public.zone_types.z_type_id;


--
-- Name: zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zones (
    zone_id integer NOT NULL,
    name character varying(255) NOT NULL,
    seats_per_row integer NOT NULL,
    num_of_rows integer NOT NULL,
    color_hex_code character varying(255) NOT NULL,
    z_type_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.zones OWNER TO postgres;

--
-- Name: zones_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zones_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zones_zone_id_seq OWNER TO postgres;

--
-- Name: zones_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zones_zone_id_seq OWNED BY public.zones.zone_id;


--
-- Name: events event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_event_id_seq'::regclass);


--
-- Name: parking_disabled_spaces p_space_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_disabled_spaces ALTER COLUMN p_space_id SET DEFAULT nextval('public.parking_disabled_spaces_p_space_id_seq'::regclass);


--
-- Name: parking_floors p_floor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_floors ALTER COLUMN p_floor_id SET DEFAULT nextval('public.parking_floors_p_floor_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: zone_disabled_seats z_seat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_disabled_seats ALTER COLUMN z_seat_id SET DEFAULT nextval('public.zone_disabled_seats_z_seat_id_seq'::regclass);


--
-- Name: zone_resources resource_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources ALTER COLUMN resource_id SET DEFAULT nextval('public.zone_resources_resource_id_seq'::regclass);


--
-- Name: zone_types z_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_types ALTER COLUMN z_type_id SET DEFAULT nextval('public.zone_types_z_type_id_seq'::regclass);


--
-- Name: zones zone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_zone_id_seq'::regclass);


--
-- Data for Name: booking_parking_spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_parking_spaces (booking_id, p_space_id) FROM stdin;
\.


--
-- Data for Name: booking_seats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_seats (z_seat_id, booking_id, person_name, identification_number) FROM stdin;
\.


--
-- Data for Name: event_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_bookings (booking_id, datetime, zone_id, event_id, total_amount, status, payment_made, person_name) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, name, poster_url, date, start_time, end_time, event_status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: parking_disabled_spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_disabled_spaces (p_space_id, space_number, space_row, type, p_floor_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: parking_floors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_floors (p_floor_id, floor_number, spaces_per_row, num_of_rows, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, password, role, "createdAt", "updatedAt") FROM stdin;
1	Abdur Rafay Saleem	arafaysaleem@gmail.com	$2a$08$KnHSm5QQ9.qpve0INFauQO8oLlA/JtRtTf0BPrdDHrJGP7tbwDeW.	admin	2022-10-15 03:21:59.901+05	2022-10-15 03:21:59.901+05
\.


--
-- Data for Name: zone_disabled_seats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zone_disabled_seats (z_seat_id, seat_number, seat_row, type, zone_id, "createdAt", "updatedAt") FROM stdin;
9	3	B	missing	6	2022-10-15 04:04:05.101+05	2022-10-15 04:04:05.101+05
10	4	B	missing	6	2022-10-15 04:04:05.102+05	2022-10-15 04:04:05.102+05
11	5	B	missing	6	2022-10-15 04:04:05.102+05	2022-10-15 04:04:05.102+05
12	1	B	blocked	6	2022-10-15 04:04:05.103+05	2022-10-15 04:04:05.103+05
13	6	D	blocked	6	2022-10-15 04:04:05.103+05	2022-10-15 04:04:05.103+05
19	3	A	missing	8	2022-10-15 04:07:55.857+05	2022-10-15 04:07:55.857+05
20	4	A	missing	8	2022-10-15 04:07:55.858+05	2022-10-15 04:07:55.858+05
21	5	A	missing	8	2022-10-15 04:07:55.858+05	2022-10-15 04:07:55.858+05
22	3	C	missing	8	2022-10-15 04:07:55.858+05	2022-10-15 04:07:55.858+05
23	4	C	missing	8	2022-10-15 04:07:55.858+05	2022-10-15 04:07:55.858+05
24	5	C	missing	8	2022-10-15 04:07:55.859+05	2022-10-15 04:07:55.859+05
25	1	B	blocked	8	2022-10-15 04:07:55.859+05	2022-10-15 04:07:55.859+05
26	6	D	blocked	8	2022-10-15 04:07:55.859+05	2022-10-15 04:07:55.859+05
\.


--
-- Data for Name: zone_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zone_resources (resource_id, resource_url, zone_id, type, "createdAt", "updatedAt") FROM stdin;
2	www.some-resource.com/video2	9	video	2022-10-15 20:00:40.385+05	2022-10-15 20:00:40.385+05
3	www.some-resource.com/image1	9	image	2022-10-15 20:00:40.386+05	2022-10-15 20:00:40.386+05
1	www.some-resources.com/video1	9	video	2022-10-15 20:00:40.384+05	2022-10-15 20:04:00.561+05
4	www.some-resources.com/image2	9	image	2022-10-15 22:02:26.986+05	2022-10-15 22:02:26.986+05
\.


--
-- Data for Name: zone_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zone_types (z_type_id, type, price, "createdAt", "updatedAt") FROM stdin;
1	vip	70	2022-10-15 03:46:36.174+05	2022-10-15 03:46:36.174+05
2	premium	50	2022-10-15 03:46:45.752+05	2022-10-15 03:46:45.752+05
\.


--
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zones (zone_id, name, seats_per_row, num_of_rows, color_hex_code, z_type_id, "createdAt", "updatedAt") FROM stdin;
4	EAST	5	4	#FF0000	1	2022-10-15 03:46:51.567+05	2022-10-15 03:46:51.567+05
8	WEST	6	7	#F3F000	2	2022-10-15 04:07:55.849+05	2022-10-15 04:07:55.849+05
6	SOUTH	7	6	#F3F000	1	2022-10-15 04:04:05.076+05	2022-10-15 04:09:09.773+05
9	NORTH	4	4	#FDDF00	1	2022-10-15 20:00:40.352+05	2022-10-15 20:00:40.352+05
\.


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 1, false);


--
-- Name: parking_disabled_spaces_p_space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_disabled_spaces_p_space_id_seq', 1, false);


--
-- Name: parking_floors_p_floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_floors_p_floor_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: zone_disabled_seats_z_seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zone_disabled_seats_z_seat_id_seq', 27, true);


--
-- Name: zone_resources_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zone_resources_resource_id_seq', 5, true);


--
-- Name: zone_types_z_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zone_types_z_type_id_seq', 2, true);


--
-- Name: zones_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zones_zone_id_seq', 9, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: parking_disabled_spaces parking_disabled_spaces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_disabled_spaces
    ADD CONSTRAINT parking_disabled_spaces_pkey PRIMARY KEY (p_space_id);


--
-- Name: parking_floors parking_floors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_floors
    ADD CONSTRAINT parking_floors_pkey PRIMARY KEY (p_floor_id);


--
-- Name: booking_parking_spaces pk_booking_parking_spaces; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT pk_booking_parking_spaces PRIMARY KEY (booking_id, p_space_id);


--
-- Name: booking_seats pk_booking_seats; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats
    ADD CONSTRAINT pk_booking_seats PRIMARY KEY (z_seat_id, booking_id);


--
-- Name: event_bookings pk_event_bookings; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_bookings
    ADD CONSTRAINT pk_event_bookings PRIMARY KEY (booking_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: zone_disabled_seats zone_disabled_seats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_disabled_seats
    ADD CONSTRAINT zone_disabled_seats_pkey PRIMARY KEY (z_seat_id);


--
-- Name: zone_resources zone_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources
    ADD CONSTRAINT zone_resources_pkey PRIMARY KEY (resource_id);


--
-- Name: zone_types zone_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_types
    ADD CONSTRAINT zone_types_pkey PRIMARY KEY (z_type_id);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (zone_id);


--
-- Name: fk_booking_parking_spaces_booking_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_booking_parking_spaces_booking_id ON public.booking_parking_spaces USING btree (booking_id);


--
-- Name: fk_booking_parking_spaces_p_space_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_booking_parking_spaces_p_space_id ON public.booking_parking_spaces USING btree (p_space_id);


--
-- Name: fk_booking_seats_booking_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_booking_seats_booking_id ON public.booking_seats USING btree (booking_id);


--
-- Name: fk_booking_seats_z_seat_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_booking_seats_z_seat_id ON public.booking_seats USING btree (z_seat_id);


--
-- Name: fk_event_bookings_event_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_event_bookings_event_id ON public.event_bookings USING btree (event_id);


--
-- Name: fk_event_bookings_zone_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_event_bookings_zone_id ON public.event_bookings USING btree (zone_id);


--
-- Name: booking_parking_spaces fk_booking_parking_spaces_booking_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT fk_booking_parking_spaces_booking_id FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id);


--
-- Name: booking_seats fk_booking_seats_booking_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats
    ADD CONSTRAINT fk_booking_seats_booking_id FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id);


--
-- Name: parking_disabled_spaces parking_disabled_spaces_p_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_disabled_spaces
    ADD CONSTRAINT parking_disabled_spaces_p_floor_id_fkey FOREIGN KEY (p_floor_id) REFERENCES public.parking_floors(p_floor_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: zone_disabled_seats zone_disabled_seats_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_disabled_seats
    ADD CONSTRAINT zone_disabled_seats_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: zone_resources zone_resources_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources
    ADD CONSTRAINT zone_resources_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: zones zones_z_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_z_type_id_fkey FOREIGN KEY (z_type_id) REFERENCES public.zone_types(z_type_id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

