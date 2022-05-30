INSERT INTO course (name, created_at) VALUES 
('Ciência da Computação', '2022-04-23 21:11:54.649'),
('Engenharia Mecânica', '2022-04-23 21:11:54.649'),
('Administração', '2022-04-23 21:11:54.649'),
('Economia', '2022-04-23 21:11:54.649');


INSERT INTO teacher (name, email, course_id, password, created_at) VALUES
('Joao Victor', 'joaovictor@ufsj.edu.br', 1, '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', '2022-04-23 21:11:54.649');

INSERT INTO student (name, email, password, created_at) VALUES
('Joao Victor Aluno', 'joaovictor@aluno.ufsj.edu.br', '$2a$10$rlvRqgwNTH.3uxTkxr0MNuaG82Ik0JdeURd26RItFdJZlbfBsk0iK', '2022-04-23 21:11:54.649');

INSERT INTO school_class (name, teacher_id, created_at) VALUES
('turma de Oficina de SW', 1, '2022-04-23 21:11:54.649'),
('turma de CG', 1, '2022-04-23 21:11:54.649');

INSERT INTO school_class_students (school_class_id, student_id, created_at) VALUES
(1, 1, '2022-04-23 21:11:54.649'),
(2, 1, '2022-04-23 21:11:54.649');


