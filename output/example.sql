INSERT INTO medical.clinics
(id, name, has_online_booking, location_type)
VALUES
    ('bebfae39-eb4c-4ca5-9d96-2279ef2c55f4', 'CLINICA TEST 1', false, 'AT_FACILITIES'),
    ('bb91397c-da3b-4cf8-9e3a-38d09da30987', 'CLINICA TEST 2', false, 'AT_FACILITIES'),
    ('60317aaa-cad8-4c17-b5b7-c9d0f7e079ca', 'CLINICA TEST 3', false, 'AT_FACILITIES')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches
(id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
VALUES
    ('9c92392f-f14d-4dd4-8b76-4aad09eb91c8', 'C111', 'TM | Metro Los Leones', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Coyancura', 2244, 'Esq Lyon/Lota. Edificio Paris', -706088728, -33423565, 0, '56229944003'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', 'C111', 'TM | San Bernardo', 'CL', 'CL-RM', 'CL SBD', 'Santiago', 'OHiggins', 337, 'NULL', -707014946, -335924114, 0, '56229944003'),
    ('03e26125-0e94-4895-ba46-1b098b091265', 'C111', 'Centro de Salud Tobalaba', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Luis Thayer Ojeda', 73, 'Piso 2. A pasos del Costanera Center', -706032104, -334179992, 0, '56229944003'),
    ('f3a1ca3e-b40a-49c9-a8f6-10bef7cbea32', 'C222', 'Nueva Sede', 'CL', 'CL-RM', 'CL PRO', 'Santiago', 'Calle Magica', 777, 'NULL', -706032104, -334179992, 0, 'NULL')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.medics_branches
(branch_id, medic_id)
VALUES
    ('9c92392f-f14d-4dd4-8b76-4aad09eb91c8', '82604d85-23ef-4631-8fb3-fd483039d054'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', '82604d85-23ef-4631-8fb3-fd483039d054'),
    ('f3a1ca3e-b40a-49c9-a8f6-10bef7cbea32', '50954d1f-2351-4d7a-9671-e4dcc96c0a3e')
 ON CONFLICT DO NOTHING;

INSERT INTO medical.branches_specialties
(branch_id, specialty_id)
VALUES
    ('9c92392f-f14d-4dd4-8b76-4aad09eb91c8', '111'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', '111'),
    ('03e26125-0e94-4895-ba46-1b098b091265', '111'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', '111'),
    ('9c92392f-f14d-4dd4-8b76-4aad09eb91c8', '222'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', '222'),
    ('03e26125-0e94-4895-ba46-1b098b091265', '222'),
    ('a006ba8d-130d-449b-a080-a35ba51fef68', '222'),
    ('03e26125-0e94-4895-ba46-1b098b091265', '333'),
    ('f3a1ca3e-b40a-49c9-a8f6-10bef7cbea32', '333')
 ON CONFLICT DO NOTHING;