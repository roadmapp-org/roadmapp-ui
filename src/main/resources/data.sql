INSERT INTO users VALUES
    ('tobiolea',1,'$2a$10$DJSezd2kgaLZ1MKHSzC7KOHi8.IQLNE5KG4lPY9IYE5Wlu.4kpeKq','USER'),
    ('smartineza',1,'$2a$10$DJSezd2kgaLZ1MKHSzC7KOHi8.IQLNE5KG4lPY9IYE5Wlu.4kpeKq','USER');

INSERT INTO projects (active, name, owner) VALUES (1, 'WS Mercados', 'tobiolea');
INSERT INTO projects (active, name, owner) VALUES (1, 'Amparos', 'smartineza');
INSERT INTO projects (active, name, owner) VALUES (1, 'DemonioMQ', 'tobiolea');
INSERT INTO projects (active, name, owner) VALUES (1, 'Sigma', 'tobiolea');

INSERT INTO tasks (active, name, project_id) VALUES (1, 'Nuevo endpoint', 1);
INSERT INTO tasks (active, name, project_id) VALUES (1, 'Pruebas unitarias', 1);
INSERT INTO tasks (active, name, project_id) VALUES (1, 'Pruebas unitarias', 2);
INSERT INTO tasks (active, name, project_id) VALUES (1, 'RFO', 2);
INSERT INTO tasks (active, name, project_id) VALUES (1, 'Refactorizar MQLoadServer', 3);

-- Inserting data into the subtasks table
INSERT INTO subtasks (active, name, task_id) VALUES (1, 'Crear controlador', 1);
INSERT INTO subtasks (active, name, task_id) VALUES (1, 'Crear DAO', 1);
INSERT INTO subtasks (active, name, task_id) VALUES (1, 'Probar Actions', 2);
INSERT INTO subtasks (active, name, task_id) VALUES (1, 'Probar DAOs', 2);
INSERT INTO subtasks (active, name, task_id) VALUES (1, 'Refactorizar while(true)', 3);

-- Inserting data into the logs table
INSERT INTO logs (active, date, log, project_id, subtask_id, task_id) VALUES (1, '2023-12-07 13:45:28', 'Log 1', 1, 1, 1);
INSERT INTO logs (active, date, log, project_id, subtask_id, task_id) VALUES (1, '2023-12-08 13:45:28', 'Log 2', 1, 1, 2);
INSERT INTO logs (active, date, log, project_id, subtask_id, task_id) VALUES (1, '2023-12-09 13:45:28', 'Log 3', 2, 2, 2);
INSERT INTO logs (active, date, log, project_id, subtask_id, task_id) VALUES (1, '2023-12-09 13:47:28', 'Log 4', 2, 2, 3);
INSERT INTO logs (active, date, log, project_id, subtask_id, task_id) VALUES (1, '2023-12-09 13:47:29', 'Log 5', 3, 3, 3);

