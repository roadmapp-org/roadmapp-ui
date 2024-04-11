import React from 'react';
import { ProjectListComponent } from './project-list-component';
import { ProjectFormComponent } from './project-form-component';

export const ProjectComponent = () => {
    return (
        <>
        <h2 className='text-2xl mb-5'>Projects</h2>
          <ProjectListComponent />
          <br></br>
          <ProjectFormComponent />
          <br></br>
        </>
    )
}