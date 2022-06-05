import { Collapse } from "antd";
import React from "react";

import PageContent from "../../../../styles/content.style";
import { TeacherClassesPageProps } from "../../../../ultis/ApiResposeTypes/Classes";
import SCollapse from "./list.style";

const { Panel } = Collapse;

function TeacherListClassesContent(props: TeacherClassesPageProps) {
  const { classes } = props;
  return (
    <PageContent>
      <SCollapse accordion>
        {classes.map((e) => (
          <Panel header={e.name} key={e.id}>
            <b>Professor: </b>
            <span>{e.teacher.name}</span>
            <b>Alunos Cadastrados: </b>
            {e.schoolClassStudens.map((student) => (
              <span>{student.name}</span>
            ))}
          </Panel>
        ))}
      </SCollapse>
    </PageContent>
  );
}

export default TeacherListClassesContent;
