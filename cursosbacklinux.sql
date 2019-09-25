--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.4

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
-- Name: cursos_id_seq; Type: SEQUENCE; Schema: public; Owner: mastergodoy
--

CREATE SEQUENCE public.cursos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cursos_id_seq OWNER TO mastergodoy;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cursos; Type: TABLE; Schema: public; Owner: mastergodoy
--

CREATE TABLE public.cursos (
    id integer DEFAULT nextval('public.cursos_id_seq'::regclass) NOT NULL,
    nombrecurso character varying(100)
);


ALTER TABLE public.cursos OWNER TO mastergodoy;

--
-- Name: ejercicios_id_seq; Type: SEQUENCE; Schema: public; Owner: mastergodoy
--

CREATE SEQUENCE public.ejercicios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ejercicios_id_seq OWNER TO mastergodoy;

--
-- Name: ejercicios; Type: TABLE; Schema: public; Owner: mastergodoy
--

CREATE TABLE public.ejercicios (
    id integer DEFAULT nextval('public.ejercicios_id_seq'::regclass) NOT NULL,
    archivo character varying(100),
    resuelto character varying(100),
    idsnapshot integer
);


ALTER TABLE public.ejercicios OWNER TO mastergodoy;

--
-- Name: inscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: mastergodoy
--

CREATE SEQUENCE public.inscripciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inscripciones_id_seq OWNER TO mastergodoy;

--
-- Name: inscripciones; Type: TABLE; Schema: public; Owner: mastergodoy
--

CREATE TABLE public.inscripciones (
    id integer DEFAULT nextval('public.inscripciones_id_seq'::regclass) NOT NULL,
    idusuario integer,
    idcurso integer,
    caducidad date
);


ALTER TABLE public.inscripciones OWNER TO mastergodoy;

--
-- Name: snapshots_id_seq; Type: SEQUENCE; Schema: public; Owner: mastergodoy
--

CREATE SEQUENCE public.snapshots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshots_id_seq OWNER TO mastergodoy;

--
-- Name: snapshots; Type: TABLE; Schema: public; Owner: mastergodoy
--

CREATE TABLE public.snapshots (
    nombremostrado character varying(50),
    archivo character varying(60),
    serie character varying(50),
    editsino boolean,
    id integer DEFAULT nextval('public.snapshots_id_seq'::regclass) NOT NULL,
    idcurso integer
);


ALTER TABLE public.snapshots OWNER TO mastergodoy;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: mastergodoy
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255),
    password character varying(255)
);


ALTER TABLE public.usuarios OWNER TO mastergodoy;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: mastergodoy
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO mastergodoy;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mastergodoy
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: cursos; Type: TABLE DATA; Schema: public; Owner: mastergodoy
--

COPY public.cursos (id, nombrecurso) FROM stdin;
1	excel
2	autocad
3	cinema4d
\.


--
-- Data for Name: ejercicios; Type: TABLE DATA; Schema: public; Owner: mastergodoy
--

COPY public.ejercicios (id, archivo, resuelto, idsnapshot) FROM stdin;
7	01-entorno_de_trabajo-ciudades.xlsx	\N	764
8	04-formulas-rangos.xlsx	\N	765
9	09-tablas_dinamicas-contactos.xlsx	\N	767
10	bloques_electricidad.rar	\N	768
11	bloques_detodo.rar	\N	769
12	PIÑON.dwg	\N	770
13	centros.zip	\N	771
14	coincidencia_indice_informe-semanal.xlsx	\N	772
15	formato condicional.xlsx	\N	773
16	thinking_particles.c4d	\N	774
17	tp03_matterwaves(luces).c4d	\N	775
18	catalejo_bloqueado.c4d	\N	776
22	cv.pdf	\N	780
\.


--
-- Data for Name: inscripciones; Type: TABLE DATA; Schema: public; Owner: mastergodoy
--

COPY public.inscripciones (id, idusuario, idcurso, caducidad) FROM stdin;
4	1	1	2018-11-06
6	1	2	2019-12-31
7	2	1	2018-12-31
8	3	2	2018-12-31
9	4	3	2018-12-31
10	1	3	2018-12-31
11	5	1	2018-12-31
12	5	2	2018-12-31
13	5	3	2018-12-31
\.


--
-- Data for Name: snapshots; Type: TABLE DATA; Schema: public; Owner: mastergodoy
--

COPY public.snapshots (nombremostrado, archivo, serie, editsino, id, idcurso) FROM stdin;
4_rangos_formulas	2_rangos_formulas.jpg	\N	f	765	1
6_impresion_marca_de_agua	6_impresion_marca_de_agua.jpg	\N	f	766	1
9_tabla_dinamica	9_tabla_dinamica.jpg	\N	f	767	1
Electricidad	electricidad.jpg	\N	f	768	2
Bloques_detodo	bloques_detodo.jpg	\N	f	769	2
Pinon	pinon.jpg	\N	f	770	2
Centros	centros.jpg	\N	f	771	1
Coincidencia_indice	coincidencia_indice.jpg	\N	f	772	1
Formato_condicional	formato_condicional.jpg	\N	f	773	1
Thinking_particles	thinking_particles.jpg	\N	f	774	3
Particles_waves	particles_waves.jpg	\N	f	775	3
Catalejo_bloqueado	catalejo_bloqueado.jpg	\N	f	776	3
Cv	cv.jpg	\N	f	780	2
EntornoDeTrabajo:Ciudades	1_entorno_de_trabajo_ciudades.jpg	\N	f	764	1
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: mastergodoy
--

COPY public.usuarios (id, nombre, password) FROM stdin;
1	carlos	porito
2	innova	excel
3	porcelanite	autocad
4	mastermedia	cinema4d
5	alumno	alumno
6	Carlos Alberto	1aB/godo
7	Carlos Alberto	1aB/godo
8	Carlos Alberto	1aB/godo
9	Carlos Alberto	1aB/godo
10	Carlos Alberto	1aB/godo
11	Carlos Alberto	1aB/godo
12	Carlos Alberto	1aB/godo
\.


--
-- Name: cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mastergodoy
--

SELECT pg_catalog.setval('public.cursos_id_seq', 3, true);


--
-- Name: ejercicios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mastergodoy
--

SELECT pg_catalog.setval('public.ejercicios_id_seq', 36, true);


--
-- Name: inscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mastergodoy
--

SELECT pg_catalog.setval('public.inscripciones_id_seq', 15, true);


--
-- Name: snapshots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mastergodoy
--

SELECT pg_catalog.setval('public.snapshots_id_seq', 801, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mastergodoy
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 13, true);


--
-- Name: cursos cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);


--
-- Name: inscripciones inscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);


--
-- Name: ejercicios pkid; Type: CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.ejercicios
    ADD CONSTRAINT pkid PRIMARY KEY (id);


--
-- Name: snapshots snapshots_pkid; Type: CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.snapshots
    ADD CONSTRAINT snapshots_pkid PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: inscripciones fk_idcurso; Type: FK CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT fk_idcurso FOREIGN KEY (idcurso) REFERENCES public.cursos(id) ON DELETE CASCADE;


--
-- Name: ejercicios fk_idsnapshot; Type: FK CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.ejercicios
    ADD CONSTRAINT fk_idsnapshot FOREIGN KEY (idsnapshot) REFERENCES public.snapshots(id) ON DELETE CASCADE;


--
-- Name: inscripciones fk_idusuario; Type: FK CONSTRAINT; Schema: public; Owner: mastergodoy
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT fk_idusuario FOREIGN KEY (idusuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

