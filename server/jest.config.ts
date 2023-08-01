/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";


export default {
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  preset: "ts-jest",
  roots: [
    "<rootDir>/src"
  ],
};
