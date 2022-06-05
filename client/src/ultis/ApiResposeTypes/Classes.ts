export interface TeacherClassesPageProps {
  classes: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      teacher: {
        id: string;
        createdAt: string;
        updatedAt: string;
        uuid: string;
        name: string;
        email: string;
      };
      schoolClassStudens: [
        {
          id: string;
          createdAt: string;
          updatedAt: string;
          uuid: string;
          name: string;
          email: string;
        }
      ];
    }
  ];
}
