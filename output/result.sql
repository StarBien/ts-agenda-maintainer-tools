
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '2e21d1f8-0337-4ace-b1d2-1b92e2785725',
            'undefined',
            'Branch 1',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            undefined,
            'undefined',
            undefined,
            undefined,
            undefined,
            'undefined'
        ) ON CONFLICT DO NOTHING;
        
        -- ADD CLINIC-RESOURCES-BRANCHES
        INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
        VALUES(
            '2e21d1f8-0337-4ace-b1d2-1b92e2785725',
            '84bf827f-1a23-4b05-86e9-91e8c83c3afa'
        ) ON CONFLICT DO NOTHING;
        
        -- ADD CLINIC-RESOURCES-BRANCHES
        INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
        VALUES(
            '2e21d1f8-0337-4ace-b1d2-1b92e2785725',
            '70cbfb6c-0a12-4405-9223-22869e9b9036'
        ) ON CONFLICT DO NOTHING;
        
        -- ADD CLINIC-RESOURCES-BRANCHES
        INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
        VALUES(
            '2e21d1f8-0337-4ace-b1d2-1b92e2785725',
            '6a0de67a-b8f0-4f84-8771-2fd94a7d7a69'
        ) ON CONFLICT DO NOTHING;
        
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            'b15dd099-353f-495f-a778-71a1ce7c5e86',
            'undefined',
            'Branch 2',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            undefined,
            'undefined',
            undefined,
            undefined,
            undefined,
            'undefined'
        ) ON CONFLICT DO NOTHING;
        
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '50a2b98c-4848-4b8d-b36d-8f4db8b264b8',
            'undefined',
            'Branch 3',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            'undefined',
            undefined,
            'undefined',
            undefined,
            undefined,
            undefined,
            'undefined'
        ) ON CONFLICT DO NOTHING;
        