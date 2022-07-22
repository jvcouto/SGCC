export interface ClassProps {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  teacher: {
    id: number;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    name: string;
    email: string;
  };
  schoolClassStudens: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      uuid: string;
      name: string;
      email: string;
    }
  ];
}
