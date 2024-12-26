
-- ADD NEW BRANCHES
INSERT INTO medical.branches
(id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
VALUES


ON CONFLICT DO NOTHING;


-- ASSOCIATE BRANCHES TO SPECIALTIES
INSERT INTO medical.branches_specialties
( branch_id, specialty_id )
VALUES


ON CONFLICT DO NOTHING;

-- ADD NEW BRANCH CLINIC-RESOURCES
INSERT INTO medical.clinic_resources (
    id, "name", country, region, commune, street_name, street_number, document_type, document_value, document_country, photo
)


ON CONFLICT DO NOTHING;


-- ASSOCIATE RESOURCES TO SPECIALTIES
INSERT INTO medical.clinic_resources_specialties (specialty_id, resource_id)
VALUES


ON CONFLICT DO NOTHING;


-- ASSOCIATE RESOURCES TO BRANCHES
INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
VALUES


ON CONFLICT DO NOTHING;