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
-- Name: enum_event_bookings_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_event_bookings_status AS ENUM (
    'reserved',
    'confirmed',
    'cancelled'
);


ALTER TYPE public.enum_event_bookings_status OWNER TO postgres;

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
    b_p_space_id integer NOT NULL,
    space_number integer NOT NULL,
    space_row character varying(255) NOT NULL,
    p_floor_id integer NOT NULL,
    booking_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.booking_parking_spaces OWNER TO postgres;

--
-- Name: booking_parking_spaces_b_p_space_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_parking_spaces_b_p_space_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_parking_spaces_b_p_space_id_seq OWNER TO postgres;

--
-- Name: booking_parking_spaces_b_p_space_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_parking_spaces_b_p_space_id_seq OWNED BY public.booking_parking_spaces.b_p_space_id;


--
-- Name: booking_seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_seats (
    b_seat_id integer NOT NULL,
    person_name character varying(255) NOT NULL,
    identification_number character varying(255) NOT NULL,
    seat_number integer NOT NULL,
    seat_row character varying(255) NOT NULL,
    booking_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.booking_seats OWNER TO postgres;

--
-- Name: booking_seats_b_seat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_seats_b_seat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_seats_b_seat_id_seq OWNER TO postgres;

--
-- Name: booking_seats_b_seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_seats_b_seat_id_seq OWNED BY public.booking_seats.b_seat_id;


--
-- Name: booking_snacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_snacks (
    b_snack_id integer NOT NULL,
    snack_id integer NOT NULL,
    quantity integer NOT NULL,
    booking_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.booking_snacks OWNER TO postgres;

--
-- Name: booking_snacks_b_snack_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_snacks_b_snack_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_snacks_b_snack_id_seq OWNER TO postgres;

--
-- Name: booking_snacks_b_snack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_snacks_b_snack_id_seq OWNED BY public.booking_snacks.b_snack_id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    brand_id integer NOT NULL,
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    logo_url text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_brand_id_seq OWNER TO postgres;

--
-- Name: brands_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_brand_id_seq OWNED BY public.brands.brand_id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: event_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_bookings (
    booking_id integer NOT NULL,
    amount_payable double precision NOT NULL,
    datetime timestamp with time zone NOT NULL,
    person_name character varying(255) NOT NULL,
    person_contact character varying(255) NOT NULL,
    person_email character varying(255) NOT NULL,
    status public.enum_event_bookings_status,
    zone_id integer NOT NULL,
    event_id integer NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.event_bookings OWNER TO postgres;

--
-- Name: event_bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_bookings_booking_id_seq OWNER TO postgres;

--
-- Name: event_bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_bookings_booking_id_seq OWNED BY public.event_bookings.booking_id;


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
-- Name: snacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snacks (
    snack_id integer NOT NULL,
    name character varying(255) NOT NULL,
    image_url text NOT NULL,
    brand_id integer NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.snacks OWNER TO postgres;

--
-- Name: snacks_snack_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snacks_snack_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snacks_snack_id_seq OWNER TO postgres;

--
-- Name: snacks_snack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snacks_snack_id_seq OWNED BY public.snacks.snack_id;


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
    number integer NOT NULL,
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
-- Name: booking_parking_spaces b_p_space_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces ALTER COLUMN b_p_space_id SET DEFAULT nextval('public.booking_parking_spaces_b_p_space_id_seq'::regclass);


--
-- Name: booking_seats b_seat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats ALTER COLUMN b_seat_id SET DEFAULT nextval('public.booking_seats_b_seat_id_seq'::regclass);


--
-- Name: booking_snacks b_snack_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_snacks ALTER COLUMN b_snack_id SET DEFAULT nextval('public.booking_snacks_b_snack_id_seq'::regclass);


--
-- Name: brands brand_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN brand_id SET DEFAULT nextval('public.brands_brand_id_seq'::regclass);


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: event_bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.event_bookings_booking_id_seq'::regclass);


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
-- Name: snacks snack_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snacks ALTER COLUMN snack_id SET DEFAULT nextval('public.snacks_snack_id_seq'::regclass);


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

COPY public.booking_parking_spaces (b_p_space_id, space_number, space_row, p_floor_id, booking_id, "createdAt", "updatedAt") FROM stdin;
1	5	B	3	4	2022-10-31 16:51:31.811+05	2022-10-31 16:51:31.811+05
2	1	A	4	7	2022-12-12 17:19:27.602+05	2022-12-12 17:19:27.602+05
\.


--
-- Data for Name: booking_seats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_seats (b_seat_id, person_name, identification_number, seat_number, seat_row, booking_id, "createdAt", "updatedAt") FROM stdin;
1	Shahmeer Asif	a1b2c3d4f5g6h7	3	A	4	2022-10-31 16:51:31.809+05	2022-10-31 16:51:31.809+05
2	Zaim Moosani	a0b2c4d6f8g0h2	4	A	4	2022-10-31 16:51:31.809+05	2022-10-31 16:51:31.809+05
3	Rafay Saleem	a1b2c3d4f5g6h7	3	C	5	2022-10-31 16:57:41.462+05	2022-10-31 16:57:41.462+05
4	Rabbiya Tariq	a0b2c4d6f8g0h2	4	C	5	2022-10-31 16:57:41.464+05	2022-10-31 16:57:41.464+05
5	Shahmeer Asif	a1b2c3d4f5g6h7	3	C	6	2022-11-16 00:48:58.905+05	2022-11-16 00:48:58.905+05
6	Zaim Moosani	a0b2c4d6f8g0h2	4	C	6	2022-11-16 00:48:58.905+05	2022-11-16 00:48:58.905+05
7	Abdur Rafay Saleem	a1b2c3d4f5g6h7	5	C	6	2022-11-16 00:48:58.906+05	2022-11-16 00:48:58.906+05
8	Rabbiya Tariq	a0b2c4d6f8g0h2	6	C	6	2022-11-16 00:48:58.906+05	2022-11-16 00:48:58.906+05
9	Haleema Syed	a1b2c3d4f5g6h7	4	C	7	2022-12-12 17:19:27.601+05	2022-12-12 17:19:27.601+05
\.


--
-- Data for Name: booking_snacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_snacks (b_snack_id, snack_id, quantity, booking_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (brand_id, category_id, name, logo_url, "createdAt", "updatedAt") FROM stdin;
1	1	Nestle	https://www.waleedshah.ae/wp-content/uploads/2018/04/Nestle-Logo.png	2023-01-27 20:54:53.891+05	2023-01-27 20:54:53.891+05
2	3	Pizza Hut	https://www.freepnglogos.com/uploads/pizza-hut-png-logo/does-the-new-logo-flavors-pizza-hut-png-13.png	2023-01-27 20:59:46.543+05	2023-01-27 20:59:46.543+05
4	6	KFC	https://cyntaria.blob.core.windows.net/images/brands/kfc.png	2023-01-27 21:02:05.663+05	2023-01-27 21:02:05.663+05
5	4	Teriyaki	https://cyntaria.blob.core.windows.net/images/brands/teriyaki.png	2023-01-27 21:02:40.038+05	2023-01-27 21:02:40.038+05
6	5	Taco Bell	https://cyntaria.blob.core.windows.net/images/brands/taco_bell.png	2023-01-27 21:03:17.468+05	2023-01-27 21:03:17.468+05
7	3	Dominos	https://cyntaria.blob.core.windows.net/images/brands/dominos.png	2023-01-27 21:03:56.989+05	2023-01-27 21:03:56.989+05
8	3	Papa Johns	https://cyntaria.blob.core.windows.net/images/brands/papa_johns.png	2023-01-27 21:04:15.056+05	2023-01-27 21:04:15.056+05
9	2	Smash Burger	https://cyntaria.blob.core.windows.net/images/brands/smash_burger.png	2023-01-27 21:08:24.053+05	2023-01-27 21:08:24.053+05
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, name, "createdAt", "updatedAt") FROM stdin;
1	Drinks	2023-01-27 20:42:55.979+05	2023-01-27 20:42:55.979+05
2	Burgers	2023-01-27 20:43:16.045+05	2023-01-27 20:43:16.045+05
3	Pizza	2023-01-27 20:43:28.199+05	2023-01-27 20:43:28.199+05
4	Chinese	2023-01-27 20:43:47.759+05	2023-01-27 20:43:47.759+05
5	Tacos	2023-01-27 20:43:55.386+05	2023-01-27 20:43:55.386+05
6	Chicken	2023-01-27 20:44:29.486+05	2023-01-27 20:44:29.486+05
\.


--
-- Data for Name: event_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_bookings (booking_id, amount_payable, datetime, person_name, person_contact, person_email, status, zone_id, event_id, "updatedAt") FROM stdin;
5	1400	2022-10-31 16:57:30+05	Rafay Saleem	+50640956712	arafaysaleem@gmail.com	confirmed	4	1	2022-10-31 16:57:41.429+05
6	2800	2022-11-16 00:44:00+05	Henry Ford	+50640956712	arafaysaleem@gmail.com	confirmed	6	1	2022-11-16 00:48:58.876+05
7	1400	2022-12-12 16:51:30+05	Gary Shane	+50640956712	arafaysaleem@gmail.com	confirmed	4	1	2022-12-12 17:19:27.474+05
4	1400	2022-10-31 16:51:30+05	Shahmeer Asif	+50682345678	arafaysaleem@gmail.com	confirmed	4	1	2023-01-27 21:37:53.748+05
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, name, poster_url, date, start_time, end_time, event_status, "createdAt", "updatedAt") FROM stdin;
1	LAKERS VS WARRIORS - NBA 2022	https://wallpapercave.com/wp/wp1713760.jpg	2023-01-20	18:00:00	23:00:00	open	2022-10-30 20:09:42.082+05	2023-01-11 12:35:30.3+05
2	ESL CHAMPIONS FINALE	https://img.mensxp.com/media/content/2019/Apr/the-esl-one-dota-2-tournament-in-mumbai-was-crazy-1200x900-1556079193.jpg	2023-01-20	14:00:00	17:30:00	open	2022-10-30 20:11:42.019+05	2023-01-11 12:39:35.454+05
4	EDM RAVE NIGHT	https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg	2023-01-12	18:00:00	23:59:00	open	2023-01-11 12:43:40.15+05	2023-01-11 12:43:40.15+05
5	LA LIGA SEMI - PSG VS MAN CITY	https://i.ytimg.com/vi/7J4315BBr2E/maxresdefault.jpg	2023-01-12	17:00:00	19:30:00	open	2023-01-11 12:54:58.686+05	2023-01-11 12:54:58.686+05
\.


--
-- Data for Name: parking_disabled_spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_disabled_spaces (p_space_id, space_number, space_row, type, p_floor_id, "createdAt", "updatedAt") FROM stdin;
1	3	A	missing	4	2022-10-23 15:44:14.096+05	2022-10-23 15:44:14.096+05
2	4	A	missing	4	2022-10-23 15:44:14.096+05	2022-10-23 15:44:14.096+05
3	5	A	missing	4	2022-10-23 15:44:14.096+05	2022-10-23 15:44:14.096+05
4	3	C	missing	4	2022-10-23 15:44:14.096+05	2022-10-23 15:44:14.096+05
5	4	C	missing	4	2022-10-23 15:44:14.097+05	2022-10-23 15:44:14.097+05
6	5	C	missing	4	2022-10-23 15:44:14.097+05	2022-10-23 15:44:14.097+05
7	1	B	blocked	4	2022-10-23 15:44:14.097+05	2022-10-23 15:44:14.097+05
8	6	D	blocked	4	2022-10-23 15:44:14.097+05	2022-10-23 15:44:14.097+05
\.


--
-- Data for Name: parking_floors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_floors (p_floor_id, floor_number, spaces_per_row, num_of_rows, "createdAt", "updatedAt") FROM stdin;
3	2	16	6	2022-10-23 15:24:22.792+05	2022-10-23 15:36:17.515+05
4	3	12	10	2022-10-23 15:44:14.073+05	2023-01-11 15:07:19.904+05
1	3	13	10	2022-10-23 15:17:57.506+05	2023-01-11 15:08:34.045+05
\.


--
-- Data for Name: snacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snacks (snack_id, name, image_url, brand_id, price, "createdAt", "updatedAt") FROM stdin;
1	Mineral Water	https://banner2.cleanpng.com/20171220/bqw/water-bottle-png-image-5a3ab38d99d457.62425636151379649363014217.jpg	1	5	2023-01-27 21:17:03.889+05	2023-01-27 21:17:03.889+05
2	Orange Iced Tea	https://www.nestleprofessional.com.au/sites/default/files/styles/np_product_detail/public/2022-03/Nestea%20Lemon.png?itok=YSkH9R6o	1	8	2023-01-27 21:18:09.932+05	2023-01-27 21:18:09.932+05
3	Cheese Burst	https://www.pngkey.com/png/full/123-1230165_singapore-pizza-hut-menu-pizza-hut-seafood-deluxe.png	2	20	2023-01-27 21:19:19.235+05	2023-01-27 21:19:19.235+05
4	Veggie	https://www.nicepng.com/png/full/52-522964_singapore-pizza-hut-menu-food.png	2	20	2023-01-27 21:19:35.518+05	2023-01-27 21:19:35.518+05
5	Peppy Paneer	https://www.nicepng.com/png/detail/811-8114767_welcome-to-pizza-hut-middle-east-pizza-hut.png	2	22	2023-01-27 21:19:57.315+05	2023-01-27 21:19:57.315+05
6	Pepperoni	https://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-HD-Image.png	7	25	2023-01-27 21:21:48.472+05	2023-01-27 21:21:48.472+05
7	Pepperoni	https://e7.pngegg.com/pngimages/523/79/png-clipart-papa-john-s-pizza-calzone-domino-s-pizza-pizza-hut-pizza-delivery.png	8	23	2023-01-27 21:22:47.115+05	2023-01-27 21:22:47.115+05
8	Whopper	https://www.nicepng.com/png/detail/379-3799619_69kib-500x540-muttonwhopper-detail-0-burger-king-burger.png	9	18	2023-01-27 21:24:36.321+05	2023-01-27 21:24:36.321+05
9	Chicken Royale	https://www.pngitem.com/pimgs/m/523-5236317_double-whopper-burger-king-hd-png-download.png	9	16	2023-01-27 21:25:00.02+05	2023-01-27 21:25:00.02+05
10	Family Bucket	https://toppng.com/uploads/preview/kfc-bucket-kfc-bucket-chicken-philippines-115632629900ljez85rhg.png	4	40	2023-01-27 21:25:57.375+05	2023-01-27 21:25:57.375+05
11	Chicken Taco	https://e7.pngegg.com/pngimages/247/952/png-clipart-taco-with-sauce-taco-bell-fast-food-junk-food-fast-food-food-recipe-thumbnail.png	6	15	2023-01-27 21:29:39.909+05	2023-01-27 21:29:39.909+05
12	Salmon Sushi	https://w7.pngwing.com/pngs/588/319/png-transparent-sushi-doughnut-japanese-cuisine-sushi-food-recipe-green-tea-thumbnail.png	5	12	2023-01-27 21:32:03.242+05	2023-01-27 21:32:03.242+05
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
1	https://live.staticflickr.com/7365/12366341903_248ca4d129_b.jpg	9	image	2022-10-15 20:00:40.384+05	2023-01-11 14:53:57.045+05
4	https://upload.wikimedia.org/wikipedia/commons/4/4f/Cowboys_Stadium_field.jpg	9	image	2022-10-15 22:02:26.986+05	2023-01-11 14:57:31.646+05
2	https://www.listentech.com/wp-content/uploads/2021/06/reference-app-image_cowboys-stadium-1-1.jpg	9	image	2022-10-15 20:00:40.385+05	2023-01-11 14:57:59.432+05
3	https://aviewfrommyseat.com/wallpaper/jboydtx-20130825124128.jpg	9	image	2022-10-15 20:00:40.386+05	2023-01-11 14:58:22.8+05
6	https://aviewfrommyseat.com/wallpaper/anonymous-20191020233010.jpg	4	image	2023-01-11 15:00:43.196+05	2023-01-11 15:00:43.196+05
7	https://aviewfrommyseat.com/medium/Boomer-20201126222715.jpg	4	image	2023-01-11 15:01:03.874+05	2023-01-11 15:01:03.874+05
8	https://aviewfrommyseat.com/medium/anonymous-20211204103103.jpg	6	image	2023-01-11 15:02:09.618+05	2023-01-11 15:02:09.618+05
9	https://aviewfrommyseat.com/medium/jboydtx-20130825143006.jpg	6	image	2023-01-11 15:03:33.964+05	2023-01-11 15:03:33.964+05
10	https://aviewfrommyseat.com/medium/tntmadriver-20101009142305.jpg	6	image	2023-01-11 15:04:23.625+05	2023-01-11 15:04:23.625+05
11	https://d1s54r5rpnqwhw.cloudfront.net/seat_views/stadium_7/227.jpg	6	image	2023-01-11 15:04:52.766+05	2023-01-11 15:04:52.766+05
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

COPY public.zones (zone_id, name, seats_per_row, number, num_of_rows, color_hex_code, z_type_id, "createdAt", "updatedAt") FROM stdin;
9	NORTH	13	9	7	#FDDF00	1	2022-10-15 20:00:40.352+05	2023-01-11 12:59:23.343+05
6	SOUTH DECK	14	7	17	#FDDF00	1	2022-10-15 04:04:05.076+05	2023-01-11 13:01:13.334+05
8	WEST HAMPSTON	6	5	7	#FDDF00	2	2022-10-15 04:07:55.849+05	2023-01-11 13:02:07.591+05
4	WEST HAMPSTON	17	6	20	#FDDF00	1	2022-10-15 03:46:51.567+05	2023-01-11 13:03:20.935+05
\.


--
-- Name: booking_parking_spaces_b_p_space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_parking_spaces_b_p_space_id_seq', 2, true);


--
-- Name: booking_seats_b_seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_seats_b_seat_id_seq', 9, true);


--
-- Name: booking_snacks_b_snack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_snacks_b_snack_id_seq', 1, false);


--
-- Name: brands_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_brand_id_seq', 9, true);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 6, true);


--
-- Name: event_bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_bookings_booking_id_seq', 7, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 5, true);


--
-- Name: parking_disabled_spaces_p_space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_disabled_spaces_p_space_id_seq', 10, true);


--
-- Name: parking_floors_p_floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_floors_p_floor_id_seq', 4, true);


--
-- Name: snacks_snack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snacks_snack_id_seq', 12, true);


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

SELECT pg_catalog.setval('public.zone_resources_resource_id_seq', 11, true);


--
-- Name: zone_types_z_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zone_types_z_type_id_seq', 2, true);


--
-- Name: zones_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zones_zone_id_seq', 9, true);


--
-- Name: booking_parking_spaces booking_parking_spaces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT booking_parking_spaces_pkey PRIMARY KEY (b_p_space_id);


--
-- Name: booking_seats booking_seats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats
    ADD CONSTRAINT booking_seats_pkey PRIMARY KEY (b_seat_id);


--
-- Name: booking_snacks booking_snacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_snacks
    ADD CONSTRAINT booking_snacks_pkey PRIMARY KEY (b_snack_id);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (brand_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: event_bookings event_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_bookings
    ADD CONSTRAINT event_bookings_pkey PRIMARY KEY (booking_id);


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
-- Name: snacks snacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snacks
    ADD CONSTRAINT snacks_pkey PRIMARY KEY (snack_id);


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
-- Name: zones zones_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_number_key UNIQUE (number);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (zone_id);


--
-- Name: booking_parking_spaces booking_parking_spaces_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT booking_parking_spaces_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_parking_spaces booking_parking_spaces_p_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT booking_parking_spaces_p_floor_id_fkey FOREIGN KEY (p_floor_id) REFERENCES public.parking_floors(p_floor_id) ON UPDATE CASCADE;


--
-- Name: booking_seats booking_seats_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats
    ADD CONSTRAINT booking_seats_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_snacks booking_snacks_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_snacks
    ADD CONSTRAINT booking_snacks_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_snacks booking_snacks_snack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_snacks
    ADD CONSTRAINT booking_snacks_snack_id_fkey FOREIGN KEY (snack_id) REFERENCES public.snacks(snack_id) ON UPDATE CASCADE;


--
-- Name: brands brands_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_bookings event_bookings_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_bookings
    ADD CONSTRAINT event_bookings_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON UPDATE CASCADE;


--
-- Name: event_bookings event_bookings_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_bookings
    ADD CONSTRAINT event_bookings_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE;


--
-- Name: parking_disabled_spaces parking_disabled_spaces_p_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_disabled_spaces
    ADD CONSTRAINT parking_disabled_spaces_p_floor_id_fkey FOREIGN KEY (p_floor_id) REFERENCES public.parking_floors(p_floor_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: snacks snacks_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snacks
    ADD CONSTRAINT snacks_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(brand_id) ON UPDATE CASCADE ON DELETE CASCADE;


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

