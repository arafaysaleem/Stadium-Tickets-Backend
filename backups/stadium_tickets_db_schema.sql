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
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'moderator'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

--
-- Name: enum_zone_resources_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_zone_resources_type AS ENUM (
    'image',
    'video'
);


ALTER TYPE public.enum_zone_resources_type OWNER TO postgres;

--
-- Name: enum_zone_seats_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_zone_seats_type AS ENUM (
    'missing',
    'disabled'
);


ALTER TYPE public.enum_zone_seats_type OWNER TO postgres;

--
-- Name: event_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.event_status AS ENUM (
    'open',
    'closed'
);


ALTER TYPE public.event_status OWNER TO postgres;

--
-- Name: parking_space_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.parking_space_type AS ENUM (
    'missing',
    'enabled',
    'disabled'
);


ALTER TYPE public.parking_space_type OWNER TO postgres;

--
-- Name: resource_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.resource_type AS ENUM (
    'video',
    'image'
);


ALTER TYPE public.resource_type OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'moderator'
);


ALTER TYPE public.user_role OWNER TO postgres;

--
-- Name: zone_seat_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.zone_seat_type AS ENUM (
    'missing',
    'enabled',
    'disabled'
);


ALTER TYPE public.zone_seat_type OWNER TO postgres;

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
-- Name: parking_floors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_floors (
    p_floor_id integer NOT NULL,
    floor_number_1 integer NOT NULL,
    spaces_per_row integer NOT NULL,
    num_of_rows integer NOT NULL
);


ALTER TABLE public.parking_floors OWNER TO postgres;

--
-- Name: parking_spaces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_spaces (
    p_space_id integer NOT NULL,
    space_number integer NOT NULL,
    p_floor_id integer NOT NULL,
    space_row character varying(2) NOT NULL,
    type public.parking_space_type NOT NULL
);


ALTER TABLE public.parking_spaces OWNER TO postgres;

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
-- Name: zone_seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zone_seats (
    z_seat_id integer NOT NULL,
    seat_number integer NOT NULL,
    seat_row character varying(255) NOT NULL,
    type public.enum_zone_seats_type,
    zone_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.zone_seats OWNER TO postgres;

--
-- Name: zone_seats_z_seat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zone_seats_z_seat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zone_seats_z_seat_id_seq OWNER TO postgres;

--
-- Name: zone_seats_z_seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zone_seats_z_seat_id_seq OWNED BY public.zone_seats.z_seat_id;


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
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: zone_resources resource_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources ALTER COLUMN resource_id SET DEFAULT nextval('public.zone_resources_resource_id_seq'::regclass);


--
-- Name: zone_seats z_seat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_seats ALTER COLUMN z_seat_id SET DEFAULT nextval('public.zone_seats_z_seat_id_seq'::regclass);


--
-- Name: zone_types z_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_types ALTER COLUMN z_type_id SET DEFAULT nextval('public.zone_types_z_type_id_seq'::regclass);


--
-- Name: zones zone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_zone_id_seq'::regclass);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


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
-- Name: parking_floors pk_parking_floors; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_floors
    ADD CONSTRAINT pk_parking_floors PRIMARY KEY (p_floor_id);


--
-- Name: parking_spaces pk_parking_spaces; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spaces
    ADD CONSTRAINT pk_parking_spaces PRIMARY KEY (p_space_id);


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
-- Name: zone_resources zone_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources
    ADD CONSTRAINT zone_resources_pkey PRIMARY KEY (resource_id);


--
-- Name: zone_seats zone_seats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_seats
    ADD CONSTRAINT zone_seats_pkey PRIMARY KEY (z_seat_id);


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
-- Name: fk_parking_spaces_p_floor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_parking_spaces_p_floor_id ON public.parking_spaces USING btree (p_floor_id);


--
-- Name: booking_parking_spaces fk_booking_parking_spaces_booking_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT fk_booking_parking_spaces_booking_id FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id);


--
-- Name: booking_parking_spaces fk_booking_parking_spaces_p_space_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_parking_spaces
    ADD CONSTRAINT fk_booking_parking_spaces_p_space_id FOREIGN KEY (p_space_id) REFERENCES public.parking_spaces(p_space_id);


--
-- Name: booking_seats fk_booking_seats_booking_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_seats
    ADD CONSTRAINT fk_booking_seats_booking_id FOREIGN KEY (booking_id) REFERENCES public.event_bookings(booking_id);


--
-- Name: parking_spaces fk_parking_spaces_p_floor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spaces
    ADD CONSTRAINT fk_parking_spaces_p_floor_id FOREIGN KEY (p_floor_id) REFERENCES public.parking_floors(p_floor_id);


--
-- Name: zone_resources zone_resources_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_resources
    ADD CONSTRAINT zone_resources_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: zone_seats zone_seats_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone_seats
    ADD CONSTRAINT zone_seats_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: zones zones_z_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_z_type_id_fkey FOREIGN KEY (z_type_id) REFERENCES public.zone_types(z_type_id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--
