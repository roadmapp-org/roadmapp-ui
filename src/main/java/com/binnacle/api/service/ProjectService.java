package com.binnacle.api.service;

import com.binnacle.api.entity.ProjectEntity;
import com.binnacle.api.entity.UserEntity;
import com.binnacle.api.model.Project;
import com.binnacle.api.repository.contract.IProjectRepository;
import com.binnacle.api.repository.contract.IUserRepository;
import com.binnacle.api.request.ProjectCreateUpdateRequest;
import com.binnacle.api.response.ErrorResponse;
import com.binnacle.api.response.PersistResponse;
import com.binnacle.api.service.contract.IProjectUseCases;
import com.binnacle.api.utils.Results;
import com.binnacle.api.utils.Tools;
import com.binnacle.api.utils.errors.ErrorCodes;
import com.binnacle.api.utils.errors.ErrorDescriptions;
import com.binnacle.api.utils.exceptions.AlreadyDefinedException;
import com.binnacle.api.utils.exceptions.RecordNotFoundException;
import com.binnacle.api.utils.exceptions.UpdateNotAllowedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService implements IProjectUseCases {
    private final IUserRepository userRepository;
    private final IProjectRepository projectRepository;

    @Override
    public PersistResponse create(ProjectCreateUpdateRequest request) {
        PersistResponse persistResponse = new PersistResponse();
        try {
            // previous validations
            ProjectEntity project = projectRepository.findByProjectName(request.getName());
            if(project != null)
                throw new AlreadyDefinedException(ErrorCodes.ALREADY_DEFINED, ErrorDescriptions.PROJECT_ALREADY_DEFINED);

            // business logic
            project = new ProjectEntity();
            project.setName(request.getName());
            project.setActive(true);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            project.setOwner(authentication.getName());
            ProjectEntity savedProject = projectRepository.save(project);

            // return
            persistResponse = new PersistResponse(Results.OK,"",savedProject,HttpStatus.OK);

        } catch(AlreadyDefinedException e){
            persistResponse = new PersistResponse(Results.ERROR, new ErrorResponse(e.getMessage(), e.getDescriptions()), "",HttpStatus.BAD_REQUEST);
        } catch(Exception e) {
            persistResponse = new PersistResponse(Results.ERROR, new ErrorResponse(e.getMessage(), ErrorDescriptions.COULD_NOT_SAVE_PROJECT),"",HttpStatus.BAD_REQUEST);
        } finally {
            return persistResponse;
        }
    }

    @Override
    public PersistResponse update(ProjectCreateUpdateRequest request) {
        PersistResponse persistResponse = new PersistResponse();
        try {
            // previous validations
            ProjectEntity project = projectRepository.findById(request.getId());
            if(project == null)
                throw new RecordNotFoundException(ErrorCodes.RECORD_NOT_FOUND, ErrorDescriptions.RECORD_NOT_FOUND);
            if(!project.getOwner().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                throw new UpdateNotAllowedException(ErrorCodes.UPDATE_NOT_ALLOWED, ErrorDescriptions.UPDATE_NOT_ALLOWED);

            //business logic
            project.setName(request.getName());
            ProjectEntity savedProject = projectRepository.save(project);

            // return
            persistResponse = new PersistResponse(Results.OK,"",savedProject,HttpStatus.OK);

        } catch(RecordNotFoundException e) {
            persistResponse = new PersistResponse(Results.ERROR, new ErrorResponse(e.getMessage(), e.getDescriptions()), "",HttpStatus.BAD_REQUEST);
        } catch(UpdateNotAllowedException e) {
            persistResponse = new PersistResponse(Results.ERROR, new ErrorResponse(e.getMessage(), e.getDescriptions()), "",HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            persistResponse = new PersistResponse(Results.ERROR, new ErrorResponse(e.getMessage(), ErrorDescriptions.COULD_NOT_SAVE_PROJECT),"",HttpStatus.BAD_REQUEST);
        } finally {
            return persistResponse;
        }
    }
}
