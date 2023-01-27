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
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, name, poster_url, date, start_time, end_time, event_status, "createdAt", "updatedAt") FROM stdin;
1	LAKERS VS WARRIORS - NBA 2022	https://wallpapercave.com/wp/wp1713760.jpg	2023-01-20	18:00:00	23:00:00	open	2022-10-30 20:09:42.082+05	2023-01-11 12:35:30.3+05
2	ESL CHAMPIONS FINALE	https://img.mensxp.com/media/content/2019/Apr/the-esl-one-dota-2-tournament-in-mumbai-was-crazy-1200x900-1556079193.jpg	2023-01-20	14:00:00	17:30:00	open	2022-10-30 20:11:42.019+05	2023-01-11 12:39:35.454+05
4	EDM RAVE NIGHT	https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg	2023-01-12	18:00:00	23:59:00	open	2023-01-11 12:43:40.15+05	2023-01-11 12:43:40.15+05
5	LA LIGA SEMI - PSG VS MAN CITY	https://i.ytimg.com/vi/7J4315BBr2E/maxresdefault.jpg	2023-01-12	17:00:00	19:30:00	open	2023-01-11 12:54:58.686+05	2023-01-11 12:54:58.686+05
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
-- Data for Name: event_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_bookings (booking_id, amount_payable, datetime, person_name, person_contact, person_email, status, zone_id, event_id, "updatedAt") FROM stdin;
5	1400	2022-10-31 16:57:30+05	Rafay Saleem	+50640956712	arafaysaleem@gmail.com	confirmed	4	1	2022-10-31 16:57:41.429+05
6	2800	2022-11-16 00:44:00+05	Henry Ford	+50640956712	arafaysaleem@gmail.com	confirmed	6	1	2022-11-16 00:48:58.876+05
7	1400	2022-12-12 16:51:30+05	Gary Shane	+50640956712	arafaysaleem@gmail.com	confirmed	4	1	2022-12-12 17:19:27.474+05
4	1400	2022-10-31 16:51:30+05	Shahmeer Asif	+50682345678	arafaysaleem@gmail.com	confirmed	4	1	2023-01-17 21:53:46.379+05
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
-- Name: booking_parking_spaces_b_p_space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_parking_spaces_b_p_space_id_seq', 2, true);


--
-- Name: booking_seats_b_seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_seats_b_seat_id_seq', 9, true);


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
-- PostgreSQL database dump complete
--

