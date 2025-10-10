import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectType from './projectType';
import Image from 'next/image';

const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className=" p-0 overflow-hidden">
        <div className="aspect-video p-0'">
          <Image
            src={project.cover_image}
            width={300}
            height={100}
            alt={project.title}
            className="object-cover w-full aspect-video"
          />
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p>{project.title}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
