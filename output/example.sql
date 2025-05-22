INSERT INTO medical.specialties
(snomed_code, snomed_label, starbien_label, specialty_type, practice_type, tags, keywords)
VALUES
    ('704443002300', 'Personal Grooming Procedure 300 - Cosmetología General', 'Cosmetología General', 'CONSULTATION', 'CONSULTATION', 'belleza', NULL),
    ('704443002301', 'Personal Grooming Procedure 301 - Evaluación Paciente Nuevo - Antiguo', 'Evaluación Paciente Nuevo - Antiguo', 'BEAUTY', 'EXAM', 'belleza', NULL),
    ('704443002302', 'Personal Grooming Procedure 302 - Evaluación Novia(o) / Madrina', 'Evaluación Novia(o) / Madrina', 'BEAUTY', 'EXAM', 'belleza', NULL),
    ('704443002303', 'Personal Grooming Procedure 303 - Control Tratamiento Anterior', 'Control Tratamiento Anterior', 'BEAUTY', 'EXAM', 'belleza', NULL),
    ('704443002304', 'Personal Grooming Procedure 304 - Peeling', 'Peeling ', 'BEAUTY', 'EXAM', 'belleza', 'exfoliación,colágeno,piel,rejuvenecimiento'),
    ('704443002125', 'Personal Grooming Procedure 125 - Limpieza', 'Limpieza Facial', 'BEAUTY', 'EXAM', 'belleza', 'facial,limpieza'),
    ('704443002306', 'Personal Grooming Procedure 306 - Hydrafacial', 'Hydrafacial ', 'BEAUTY', 'EXAM', 'belleza', 'facial,hidratación'),
    ('704443002307', 'Personal Grooming Procedure 307 - Mesoterapia', 'Mesoterapia ', 'BEAUTY', 'EXAM', 'belleza', 'rejuvenecimiento,dermis,alopecia'),
    ('704443002308', 'Personal Grooming Procedure 308 - Bioestimulación', 'Bioestimulación', 'BEAUTY', 'EXAM', 'belleza', 'piel,colágeno,luminosidad,arrugas'),
    ('704443002309', 'Personal Grooming Procedure 309 - Ácido Hialurónico', 'Ácido Hialurónico', 'BEAUTY', 'EXAM', 'belleza', 'hidratación,arrugas,piel,rostro'),
    ('704443002310', 'Personal Grooming Procedure 310 - Toxina Botulínica (botox)', 'Toxina Botulínica (botox)', 'BEAUTY', 'EXAM', 'belleza', 'tratamiento,facial'),
    ('704443002311', 'Personal Grooming Procedure 311 - Láser dermatológico', 'Láser dermatológico', 'BEAUTY', 'EXAM', 'belleza', 'tratamiento,facial,acne,manchas,rosácea'),
    ('704443002312', 'Personal Grooming Procedure 312 - HIFU - Estimulación de colágeno por ultrasonido', 'HIFU - Estimulación de colágeno por ultrasonido', 'BEAUTY', 'EXAM', 'belleza', 'colageno,ultrasonido,rejuvenecimiento'),
    ('704443002313', 'Personal Grooming Procedure 313 - Micropigmentación Cejas - Delineado', 'Micropigmentación Cejas - Delineado', 'BEAUTY', 'EXAM', 'belleza', 'maquillaje,facial'),
    ('394582007', 'Dermatology', 'Dermatología', 'CONSULTATION', 'CONSULTATION', 'belleza', 'piel,acne,manchas,pelo,cabello,uñas')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.clinics
(id, name, has_online_booking, tags)
VALUES
    ('34b22be9-cd2e-44c5-9b8a-426c8ea23665', 'SkinUp', true, 'belleza')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches
(id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone, attendance_type)
VALUES
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '34b22be9-cd2e-44c5-9b8a-426c8ea23665', 'SkinUp - Vitacura', 'CL', 'CL-RM', 'CL VIT', 'Santiago', 'Av. Presidente Kennedy', 5770, 'Oficina 1104', -33.399542, -70.5746767, 0, '56 9 5358 6814', 'IN_PERSON')
 ON CONFLICT DO NOTHING;

INSERT INTO persons.persons
(id, firstname, lastname, mother_maiden_name, birthdate, country, region, commune, city, street_name, street_number, rest_of_address, document_type, document_value, document_country, gender, deceased, phone, email)
VALUES
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', 'Paulina', 'Ramirez', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '15638660-K', 'CL', NULL, 'false', '', 'paulina.ramirez.diez@gmail.com'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', 'María Paz', 'Doyharcabal', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '15643752-2', 'CL', NULL, 'false', '', 'mariapaz@skinup.cl'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', 'Carolina', 'Cuiñas', 'Camus', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '15784225-0', 'CL', NULL, 'false', '', 'carocuinas@gmail.com'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', 'Javiera', 'Guarda', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '16047857-8', 'CL', NULL, 'false', '', 'javiera@skinup.cl'),
    ('d16e6e54-1db2-436a-83f2-f63e287da52c', 'Florencia', 'Ruiz', 'Razeto', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '16207257-9', 'CL', NULL, 'false', '', 'draflorenciaruiz@gmail.com'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', 'Consuelo', 'Elizalde', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '17118540-8', 'CL', NULL, 'false', '', 'consuelo.elizalder@gmail.com'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', 'Javiera', 'Orlandini', 'Rodriguez', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '17702528-3', 'CL', NULL, 'false', '', 'orlandinijavi@gmail.com'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', 'Mary', 'Barreto', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '27068735-0', 'CL', NULL, 'false', '', 'skinup00@gmail.com'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', 'Carolina', 'Galarraga', 'Gragirena', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '27099198-K', 'CL', NULL, 'false', '', 'skinup00@gmail.com'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', 'Bernardita', 'Vial', 'Errázuriz', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '20838748-0', 'CL', NULL, 'false', '', 'berniviale@gmail.com'),
    ('734cc6b5-e368-4267-be85-4b770d810a8d', 'María José', 'Correa', 'Black', NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '18020750-3', 'CL', NULL, 'false', '', 'mjcorreablack@gmail.com'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', 'María Julia', 'Puca', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '48226701-7', 'CL', NULL, 'false', '', 'juliecita5@gmail.com'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', 'Mairena', 'Paganini', NULL, NULL, 'CL', NULL, NULL, '', '', NULL, NULL, 'RUT', '27942239-2', 'CL', NULL, 'false', '', 'mairenapaganini@hotmail.com')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.medics
(id, photo)
VALUES
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('d16e6e54-1db2-436a-83f2-f63e287da52c', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('734cc6b5-e368-4267-be85-4b770d810a8d', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', 'https://www.starbien.life/images/generic_practitioner_icon.png.png'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', 'https://www.starbien.life/images/generic_practitioner_icon.png.png')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.clinic_resources
(id, "name", country, region, commune, street_name, street_number, document_type, document_value, document_country, photo)
VALUES
    ('46cdebc8-0120-4842-96f2-702ca49357a0', 'Skinup Tratamiento', 'CL', NULL, NULL, NULL, NULL, '', '', '', '')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.medics_branches
(branch_id, medic_id)
VALUES
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '6090bc5b-0393-49d5-b20a-85fb005fd665'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'aadb2fa5-36d2-4de6-b886-41b1f9906091'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '2a07064a-b953-4720-845a-1d7a5cadced7'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'a225bef6-c9f0-4427-81a1-67ad0e6f4f23'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'd16e6e54-1db2-436a-83f2-f63e287da52c'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'd40e04d9-8d93-4b61-bbeb-b188a220a64c'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'ac104791-e754-42ff-84e1-d7bf4d62cee8'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '3ecbf827-5f74-4ae5-a874-d3f1cdb458a1'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'e4c62a84-699a-416e-a711-d8cbdc5d1786'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '709e6fc5-d982-4f97-9a20-dfa79957d918'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '734cc6b5-e368-4267-be85-4b770d810a8d'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', 'fa7f5f01-758e-40cb-b552-39c967c58df0'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '0a26d58f-2b03-4ba8-9002-2bf2ef799c81')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.clinic_resources_branches
(branch_id, resource_id)
VALUES
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '46cdebc8-0120-4842-96f2-702ca49357a0')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches_specialties
(branch_id, specialty_id)
VALUES
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002301'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002125'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002304'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002309'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002303'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002307'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002306'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002312'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002302'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002310'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002308'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '704443002313'),
    ('8fc918a6-05f9-4282-bcd2-335942f1c9b2', '394582007')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.specialties_medics
(medic_id, specialty_id)
VALUES
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002301'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002301'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002301'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002301'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002301'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', '704443002301'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', '704443002301'),
    ('734cc6b5-e368-4267-be85-4b770d810a8d', '704443002301'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', '704443002301'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002301'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002301'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002301'),
    ('d16e6e54-1db2-436a-83f2-f63e287da52c', '704443002301'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002125'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', '704443002125'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', '704443002125'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002304'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002304'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002304'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002304'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002304'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', '704443002304'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', '704443002304'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', '704443002304'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002304'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002304'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002304'),
    ('d16e6e54-1db2-436a-83f2-f63e287da52c', '704443002304'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002309'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002309'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002309'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002309'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002309'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002309'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002309'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002303'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002303'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002303'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002303'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002303'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002303'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002303'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002307'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002307'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002307'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002307'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002307'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002307'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002307'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002307'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002306'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002306'),
    ('aadb2fa5-36d2-4de6-b886-41b1f9906091', '704443002306'),
    ('709e6fc5-d982-4f97-9a20-dfa79957d918', '704443002306'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002312'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002312'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002312'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002312'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002312'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002312'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002312'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002302'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002302'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002302'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002302'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002302'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002302'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002302'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002302'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002310'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002310'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002310'),
    ('e4c62a84-699a-416e-a711-d8cbdc5d1786', '704443002310'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', '704443002310'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002310'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002310'),
    ('a225bef6-c9f0-4427-81a1-67ad0e6f4f23', '704443002310'),
    ('6090bc5b-0393-49d5-b20a-85fb005fd665', '704443002308'),
    ('d40e04d9-8d93-4b61-bbeb-b188a220a64c', '704443002308'),
    ('ac104791-e754-42ff-84e1-d7bf4d62cee8', '704443002308'),
    ('3ecbf827-5f74-4ae5-a874-d3f1cdb458a1', '704443002308'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', '704443002308'),
    ('0a26d58f-2b03-4ba8-9002-2bf2ef799c81', '704443002308'),
    ('2a07064a-b953-4720-845a-1d7a5cadced7', '704443002308'),
    ('734cc6b5-e368-4267-be85-4b770d810a8d', '704443002313'),
    ('fa7f5f01-758e-40cb-b552-39c967c58df0', '394582007')
 ON CONFLICT DO NOTHING;