import USER_ROLES from "../../ultis/constants/userRoles";

const SYSTEM_PAGES = Object.freeze({
  semesters: {
    label: "Semestres",
    path: "/semesters",
    key: "semesters",
  },
  courses: {
    label: "Cursos",
    path: "/courses",
    key: "courses",
  },
  settings: {
    label: "Configurações",
    path: "/settings",
    key: "config",
  },
});

const getRolePages = (userRoles: number[]) => {
  const pages = [];

  if (userRoles.includes(USER_ROLES.SYSTEM_ADMIN))
    pages.push(
      SYSTEM_PAGES.semesters,
      SYSTEM_PAGES.courses,
      SYSTEM_PAGES.settings
    );

  return pages;
};

const getDefaultUserPage = (userRoles: number[]) => {
  if (userRoles.includes(USER_ROLES.SYSTEM_ADMIN))
    return SYSTEM_PAGES.settings.key;
};

export { getRolePages, getDefaultUserPage };
