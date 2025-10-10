import React from 'react';
import { EmptyDemo } from '../empty';
import ProjectType from './projectType';
import ProjectCard from './project-card';
import Link from 'next/link';
import ToggableItemList from '../item-list';

const ProjectsList = async ({ projects }: { projects: ProjectType[] }) => {
  if (projects == null || projects.length == 0) {
    return <EmptyDemo />;
  } else {
    return (
      <ToggableItemList>
        {projects.map((project, i: number) => {
          return (
            <li key={project.id}>
              <Link href={`/protected/projects/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </li>
          );
        })}
      </ToggableItemList>
    );
  }
};

export default ProjectsList;
