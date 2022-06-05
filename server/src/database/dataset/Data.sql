INSERT INTO course (name, created_at) VALUES 
('Ciência da Computação', '2022-04-23 21:11:54.649'),
('Engenharia Mecânica', '2022-04-23 21:11:54.649'),
('Administração', '2022-04-23 21:11:54.649'),
('Economia', '2022-04-23 21:11:54.649');

INSERT INTO "public"."user" (name, email, course_id, password, role_id, created_at) VALUES
('Joao Victor', 'joaovictor@ufsj.edu.br', 1, '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', 2, '2022-04-23 21:11:54.649');

INSERT INTO "public"."user" (name, email, course_id, password , role_id, created_at) VALUES
('Aluno 1', 'aluno1@aluno.ufsj.edu.br', 1, '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', 1, '2022-04-23 21:11:54.649'),
('Aluno 2', 'aluno2@aluno.ufsj.edu.br', 1, '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', 1, '2022-04-23 21:11:54.649'),
('Aluno 3', 'aluno3@aluno.ufsj.edu.br', 1, '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', 1, '2022-04-23 21:11:54.649');

INSERT INTO school_class (name, teacher_id, created_at) VALUES
('Oficina de Software', 1, '2022-04-23 21:11:54.649'),
('Turma de Computacao grafica', 1, '2022-04-23 21:11:54.649');

INSERT INTO school_class_students (school_class_id, student_id, created_at) VALUES
(1, 2, '2022-04-23 21:11:54.649'),
(1, 3, '2022-04-23 21:11:54.649'),
(1, 4, '2022-04-23 21:11:54.649'),
(2, 2, '2022-04-23 21:11:54.649'),
(2, 3, '2022-04-23 21:11:54.649'),
(2, 4, '2022-04-23 21:11:54.649');


