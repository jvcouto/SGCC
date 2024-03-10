
INSERT INTO public."user" (id,"name",email,"password",sys_admin,fisrt_login,"departamentId") VALUES
	 ('b7c07177-a0ee-4ab6-9f77-3ba6724697c1','joao','joao@teste.com','$2a$10$l/PQQDhRC.J7xSWdCH78i.VH4.drm9KsCUx9LqeV9J68mHXmWVhu.',true,true,NULL),
	 ('ffa2bc28-139f-4845-9aab-e505b379c2f5','professor1','professor1@teste.com','$2a$10$OssqdLQ8bGf/Pszpz9/bEuCrZpOosToY/aHhoKkrREf5t29r9ZRtS',false,true,NULL),
	 ('151cad30-e457-41ea-ac28-0f7db0d86def','professor2','professor2@teste.com','$2a$10$P7AZ01DPcdCKCMJoHBlPh.L2wYRRRGci07PhDyvO4qE3R3Uo93Imq',false,true,NULL),
	 ('9e208a1a-bbd7-403c-bc50-d831832df3ea','professor3','professor3@teste.com','$2a$10$xPv/HHY71GtnmdrlbnNfru8VHl0EmsIhA9ckCJ5mE5a7G8dmcdkgu',false,true,NULL),
	 ('fae699a6-4f2f-4124-96a7-cc54119cc749','professor4','professor4@teste.com','$2a$10$TRdLhpR/cznMHxJe2qtGQebkAooALiQsptz2VxF3w4TTTJBB7QrZe',false,true,NULL),
	 ('1fc1dfbf-462a-4f30-9f5c-6b220e54b20c','professor5','professor5@teste.com','$2a$10$r8jbKp/BmaCTWWT2iQLDkeZXiuZuGKcAmJIal7qhtZm5/M1ly7Zie',false,true,NULL),
	 ('ef03c43b-08c3-458d-8f21-6abb2642df50','professor6','professor6@teste.com','$2a$10$GA9OX6kJ2UAE08fhTpSUMuvNmLCvRIuz3BZTnhRU41TtQhco81.B.',false,true,NULL),
	 ('acb5df6a-61d8-4ce7-9a5b-35b94cb8ea77','professor7','professor7@teste.com','$2a$10$vYbm2aFK3pwUCUEK78qC2OM3ImCgT3uzT8nsyiLHyzn23Hd9mxvQW',false,true,NULL),
	 ('bec91916-bcba-48cc-99db-1c043a0e4a68','professor8','professor8@teste.com','$2a$10$pw5i4Yf4lTFETo6HAuvIu.gkUhRYU61OIG2tB6uhdYypWfxoowjha',false,true,NULL),
	 ('e6429a55-e10e-48a2-b8cf-52481a9621a2','professor9','professor9@teste.com','$2a$10$PqMexhsgF/pq/2K3Hnd9gedBvOPr6dQCmBrDsGWP2S5ayx.2wAGjG',false,true,NULL);



INSERT INTO public.departament (created_at,updated_at,"name",code) VALUES
	 ('2024-03-10 16:51:03.261',NULL,'Departamento da Computação','DCOMP');

   INSERT INTO public.departament_admin (created_at,updated_at,"adminRole","departamentId","userId") VALUES
	 ('2024-03-10 16:51:03.252',NULL,'chief',1,'acb5df6a-61d8-4ce7-9a5b-35b94cb8ea77');




INSERT INTO public.course (created_at,updated_at,"name",duration,shift) VALUES
	 ('2024-02-25 20:04:48.505',NULL,'Ciencia da Computação',4,'fulltime');


   INSERT INTO public.course_admin (created_at,updated_at,"adminRole","courseId","userId") VALUES
	 ('2024-02-25 20:04:48.487',NULL,'coordinator',1,'e6429a55-e10e-48a2-b8cf-52481a9621a2'),
	 ('2024-02-25 20:04:48.487',NULL,'vice-coordinator',1,'bec91916-bcba-48cc-99db-1c043a0e4a68'),
	 ('2024-02-25 20:04:48.487',NULL,'secretary',1,'ef03c43b-08c3-458d-8f21-6abb2642df50');



INSERT INTO public.subject (created_at,updated_at,"name","shortName",places,semester,workload,"theoreticalWorkload","praticalWorkload","optionalSubject",curriculum,syllabus,objective,bibliography,"complementaryBibliography","courseId","departamentId") VALUES
	 ('2024-03-10 17:16:48.617',NULL,'Matematica Discreta','MD',99,1,72,72,0,false,'2020-03-10 17:15:02.000','1231','123','1231','1231231',1,1),
	 ('2024-03-10 17:18:08.158',NULL,'Algoritmos e estrutura de dados 1','AEDS1',99,1,92,60,32,false,'2020-03-10 17:18:03.000','qweqe','qeqqwe','qweq','qweqw',1,1);
