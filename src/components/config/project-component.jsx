import React from 'react';
import { ProjectListComponent } from './project-list-component';
import { ProjectFormComponent } from './project-form-component';

export const ProjectComponent = () => {
    return (
        <div className="bg-custom-white p-4 rounded-md">
          <h2 className='text-2xl mb-3'>Projects</h2>
          <ProjectListComponent />
          <ProjectFormComponent />
        </div>
    )
}