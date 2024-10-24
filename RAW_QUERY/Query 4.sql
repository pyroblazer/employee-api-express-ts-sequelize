-- RAW_QUERY/QUERY 4.sql

SELECT 
    e.id AS employee_id,
    e.nik,
    e.name,
    e.is_active,
    ep.gender,
    CONCAT(EXTRACT(YEAR FROM AGE(CAST(ep.date_of_birth AS DATE))), ' Years Old') AS age,
    ed.name AS school_name,
    ed.level,
    COALESCE(
        CONCAT(
            COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END), ' Istri & ',
            COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END), ' Anak'
        ), '-') AS family_data
FROM 
    public.employee e
JOIN 
    public.employee_profile ep ON e.id = ep.employee_id
LEFT JOIN 
    public.education ed ON e.id = ed.employee_id
LEFT JOIN 
    public.employee_family ef ON e.id = ef.employee_id
GROUP BY 
    e.id, e.nik, e.name, e.is_active, ep.id, ep.gender, ep.date_of_birth, ed.id, ed.name, ed.level
ORDER BY
	e.id;
