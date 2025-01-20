INSERT INTO medical.specialties
(snomed_code, snomed_label, starbien_label, specialty_type, practice_type)
VALUES
    ('111', 'SNOME #1', 'Especialidad 1', 'CONSULTATION', 'CONSULTATION'),
    ('222', 'SNOMED #2', 'Especialidad 2', 'LABORATORY', 'EXAM'),
    ('333', 'SNOMED #3', 'Especialidad 3', 'IMAGING', 'EXAM')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.clinics
(id, name, has_online_booking, location_type)
VALUES
    ('9a9447c4-ae99-432d-8379-7d480075ab73', 'CLINICA TEST 1', false, 'AT_FACILITIES'),
    ('a6966952-2906-4904-a0f2-40c725184d4b', 'CLINICA TEST 2', false, 'AT_FACILITIES'),
    ('8e5b8a11-8737-41ee-a924-7701eeccffc0', 'CLINICA TEST 3', false, 'AT_FACILITIES')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches
(id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
VALUES
    ('4bae4d51-460a-4b1a-a314-c3f0cec5d7de', '9a9447c4-ae99-432d-8379-7d480075ab73', 'TM | Metro Los Leones', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Coyancura', 2244, 'Esq Lyon/Lota. Edificio Paris', -70.6088728, -33.423565, 0, '56229944003'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', '9a9447c4-ae99-432d-8379-7d480075ab73', 'TM | San Bernardo', 'CL', 'CL-RM', 'CL SBD', 'Santiago', 'O''Higgins', 337, 'NULL', -70.7014946, -33.5924114, 0, '56229944003'),
    ('29b4e69b-eeb3-45ce-abf3-13a30e322208', 'a6966952-2906-4904-a0f2-40c725184d4b', 'Centro de Salud Tobalaba', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Luis Thayer Ojeda', 73, 'Piso 2. A pasos del Costanera Center', -70.6032104, -33.4179992, 0, '56229944003'),
    ('6d217f6a-7081-41c9-93cc-c576040f5a69', 'dcf6a6e2-3559-436f-96c5-c45c126f777', 'Nueva Sede', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Calle Magica', 777, 'NULL', -70.6032104, -33.4179992, 0, 'NULL')
 ON CONFLICT DO NOTHING;

INSERT INTO persons.persons
(id, firstname, lastname, mother_maiden_name, birthdate, country, region, commune, city, street_name, street_number, rest_of_address, document_type, document_value, document_country, gender, deceased, phone, email)
VALUES
    ('a01aa77f-a776-4cb8-b89e-9fbf4d821933', 'Juan', 'Perez', 'Rodriguez', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', 'NULL', 'CL', NULL, 'false', '', 'NULL'),
    ('cea5dc1a-0db4-4f50-8f0c-6cdfbfd8a307', 'Terminator', 'T-1000', 'O''Connor', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', 'NULL', 'CL', NULL, 'false', '', 'NULL')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.medics
(id, photo, attendance_type, location_type)
VALUES
    ('a01aa77f-a776-4cb8-b89e-9fbf4d821933', 'https://www.starbien.life/images/generic_practitioner_icon.png.png', 'IN_PERSON', 'AT_FACILITIES'),
    ('cea5dc1a-0db4-4f50-8f0c-6cdfbfd8a307', 'https://www.starbien.life/images/generic_practitioner_icon.png.png', 'IN_PERSON', 'AT_FACILITIES')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.medics_branches
(branch_id, medic_id)
VALUES
    ('4bae4d51-460a-4b1a-a314-c3f0cec5d7de', 'cea5dc1a-0db4-4f50-8f0c-6cdfbfd8a307'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', 'cea5dc1a-0db4-4f50-8f0c-6cdfbfd8a307'),
    ('6d217f6a-7081-41c9-93cc-c576040f5a69', 'a01aa77f-a776-4cb8-b89e-9fbf4d821933')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches_specialties
(branch_id, specialty_id)
VALUES
    ('4bae4d51-460a-4b1a-a314-c3f0cec5d7de', '111'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', '111'),
    ('29b4e69b-eeb3-45ce-abf3-13a30e322208', '111'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', '111'),
    ('4bae4d51-460a-4b1a-a314-c3f0cec5d7de', '222'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', '222'),
    ('29b4e69b-eeb3-45ce-abf3-13a30e322208', '222'),
    ('afaf6497-ec20-4eb2-a672-c16acd396206', '222'),
    ('29b4e69b-eeb3-45ce-abf3-13a30e322208', '333'),
    ('6d217f6a-7081-41c9-93cc-c576040f5a69', '333')
 ON CONFLICT DO NOTHING;