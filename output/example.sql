INSERT INTO medical.specialties
(snomed_code, snomed_label, starbien_label, specialty_type, practice_type)
VALUES
    ('111', 'SNOME #1', 'Especialidad 1', 'CONSULTATION', 'CONSULTATION'),
    ('222', 'SNOMED #2', 'Especialidad 2', 'LABORATORY', 'EXAM'),
    ('333', 'SNOMED #3', 'Especialidad 3', 'IMAGING', 'EXAM')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.clinics
(id, name, has_online_booking, location_type)
VALUES
    ('6e5f29a1-6178-47d0-95ab-cbc686514e11', 'CLINICA TEST 1', false, 'AT_FACILITIES'),
    ('ce85564b-6071-4ecf-b8ae-7c5fba0d1bc8', 'CLINICA TEST 2', false, 'AT_FACILITIES'),
    ('52fef587-0c2d-4051-be2c-2a367287b72a', 'CLINICA TEST 3', false, 'AT_FACILITIES')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.branches
(id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
VALUES
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '6e5f29a1-6178-47d0-95ab-cbc686514e11', 'TM | Metro Los Leones', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Coyancura', 2244, 'Esq Lyon/Lota. Edificio Paris', -70.6088728, -33.423565, 0, NULL),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '6e5f29a1-6178-47d0-95ab-cbc686514e11', 'TM | San Bernardo', 'CL', 'CL-RM', 'CL SBD', 'Santiago', 'O''Higgins', 337, NULL, -70.7014946, -33.5924114, 0, NULL),
    ('91003bdb-4b84-4aa1-96de-60f8d96dd4ac', 'ce85564b-6071-4ecf-b8ae-7c5fba0d1bc8', 'Centro de Salud Tobalaba', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Luis Thayer Ojeda', 73, 'Piso 2. A pasos del Costanera Center', -70.6032104, -33.4179992, 0, NULL),
    ('a8d2fedb-fcc5-4dae-847d-aa73b42aa992', 'dcf6a6e2-3559-436f-96c5-c45c126f777', 'Nueva Sede', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Calle Magica', 777, NULL, -70.6032104, -33.4179992, 0, NULL)
 ON CONFLICT DO NOTHING;;

INSERT INTO persons.persons
(id, firstname, lastname, mother_maiden_name, birthdate, country, region, commune, city, street_name, street_number, rest_of_address, document_type, document_value, document_country, gender, deceased, phone, email)
VALUES
    ('20eb2946-9d72-4bc9-bcb8-d10aaa641466', 'Juan', 'Perez', 'Rodriguez', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', NULL, 'CL', NULL, 'false', '', NULL),
    ('06acf593-19ee-4c3f-bc02-cf852f490ed7', 'Terminator', 'T-1000', 'O''Connor', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', NULL, 'CL', NULL, 'false', '', NULL)
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.medics
(id, photo, attendance_type, location_type)
VALUES
    ('20eb2946-9d72-4bc9-bcb8-d10aaa641466', 'https://www.starbien.life/images/generic_practitioner_icon.png.png', 'IN_PERSON', 'AT_FACILITIES'),
    ('06acf593-19ee-4c3f-bc02-cf852f490ed7', 'https://www.starbien.life/images/generic_practitioner_icon.png.png', 'IN_PERSON', 'AT_FACILITIES')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.clinic_resources
(id, "name", country, region, commune, street_name, street_number, document_type, document_value, document_country, photo)
VALUES
    ('9fc45699-59cf-4ef4-abbc-8548ccb194f6', 'Scanner CT', 'CL', 'CL-RM', 'CL SCL', 'Luis Thayer Ojeda', '73', NULL, NULL, NULL, 'https://www.starbien.life/scheduling/images/icons/icon_exam_imaging_mri.png'),
    ('70f26ebc-78f8-4120-974b-7eb838d9bdf1', 'Resonancia Magnetica', 'CL', 'CL-RM', 'CL SCL', 'Luis Thayer Ojeda', '73', NULL, NULL, NULL, NULL),
    ('88e02674-2c97-4c52-a72b-60d5c76b3654', 'Mamografía', 'CL', 'CL-RM', 'CL SCL', 'Luis Thayer Ojeda', '73', NULL, NULL, NULL, NULL),
    ('5967cb3a-d64f-4676-845f-f11075cef676', 'Rayos X', 'CL', 'CL-RM', 'CL SCL', 'Luis Thayer Ojeda', '73', NULL, NULL, NULL, NULL)
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.medics_branches
(branch_id, medic_id)
VALUES
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '06acf593-19ee-4c3f-bc02-cf852f490ed7'),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '06acf593-19ee-4c3f-bc02-cf852f490ed7'),
    ('a8d2fedb-fcc5-4dae-847d-aa73b42aa992', '20eb2946-9d72-4bc9-bcb8-d10aaa641466')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.clinic_resources_branches
(branch_id, resource_id)
VALUES
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '88e02674-2c97-4c52-a72b-60d5c76b3654'),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '88e02674-2c97-4c52-a72b-60d5c76b3654')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.branches_specialties
(branch_id, specialty_id)
VALUES
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '111'),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '111'),
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '222'),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '222'),
    ('f8f5cfed-71c9-4220-9849-402c86e5bc7f', '333'),
    ('781f4c04-2ac6-46f0-aa8b-cdbe23948d52', '333'),
    ('91003bdb-4b84-4aa1-96de-60f8d96dd4ac', '333'),
    ('a8d2fedb-fcc5-4dae-847d-aa73b42aa992', '333')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.clinic_resources_specialties
(specialty_id, resource_id)
VALUES
    ('111', '88e02674-2c97-4c52-a72b-60d5c76b3654'),
    ('222', '88e02674-2c97-4c52-a72b-60d5c76b3654'),
    ('333', '88e02674-2c97-4c52-a72b-60d5c76b3654')
 ON CONFLICT DO NOTHING;;

INSERT INTO medical.specialties_medics
(medic_id, specialty_id)
VALUES
    ('06acf593-19ee-4c3f-bc02-cf852f490ed7', '111'),
    ('06acf593-19ee-4c3f-bc02-cf852f490ed7', '222'),
    ('06acf593-19ee-4c3f-bc02-cf852f490ed7', '333')
 ON CONFLICT DO NOTHING;;