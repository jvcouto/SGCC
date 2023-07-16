import USER_ROLES from "../../utils/constants/userRoles";

const SYSTEM_PAGES = Object.freeze({
  periods: {
    label: "Período",
    path: "/dashboard/periods",
    key: "periods",
  },
  courses: {
    label: "Cursos",
    path: "/dashboard/courses",
    key: "courses",
  },
  departaments: {
    label: "Departamentos",
    path: "/dashboard/departaments",
    key: "departament",
  },
  settings: {
    label: "Minha conta",
    path: "/dashboard/settings/email",
    key: "config",
  },
  offers: {
    label: "Ofertas",
    path: "/dashboard/offers",
    key: "offers",
  },
});

const getSelectedKey = (path: string) => {
  if (!path) return null;

  return SYSTEM_PAGES[path].key;
};

const getRolePages = (userRoles: number[]) => {
  const pages = new Set([SYSTEM_PAGES.settings]);

  if (!userRoles || !userRoles.length) return pages;

  if (userRoles.includes(USER_ROLES.SYSTEM_ADMIN)) {
    pages.add(SYSTEM_PAGES.departaments);
    pages.add(SYSTEM_PAGES.periods);
    pages.add(SYSTEM_PAGES.courses);
    return pages;
  }

  if (userRoles.includes(USER_ROLES.TEACHER)) {
    pages.add(SYSTEM_PAGES.departaments);
  }

  if (userRoles.includes(USER_ROLES.COLLEGE_MEMBER)) {
    pages.add(SYSTEM_PAGES.courses);
  }

  if (userRoles.includes(USER_ROLES.COURSE_ADMIN)) {
    pages.add(SYSTEM_PAGES.courses);
  }

  return pages;
};

export { getRolePages, getSelectedKey };
