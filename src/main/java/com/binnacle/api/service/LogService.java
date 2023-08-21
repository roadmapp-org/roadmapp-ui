package com.binnacle.api.service;

import com.binnacle.api.entity.LogEntity;
import com.binnacle.api.entity.ProjectEntity;
import com.binnacle.api.entity.SubtaskEntity;
import com.binnacle.api.entity.TaskEntity;
import com.binnacle.api.repository.contract.ILogRepository;
import com.binnacle.api.repository.contract.IProjectRepository;
import com.binnacle.api.repository.contract.ISubTaskRepository;
import com.binnacle.api.repository.contract.ITaskRepository;
import com.binnacle.api.request.CreateUpdateLogRequest;
import com.binnacle.api.response.PersistResponse;
import com.binnacle.api.service.contract.ILogUseCases;
import com.binnacle.api.utils.Results;
import com.binnacle.api.utils.Tools;
import com.binnacle.api.utils.errors.ErrorCodes;
import com.binnacle.api.utils.errors.ErrorDescriptions;
import com.binnacle.api.utils.exceptions.ActionNotAllowedException;
import com.binnacle.api.utils.exceptions.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class LogService implements ILogUseCases {
    private final ILogRepository logRepository;
    private final IProjectRepository projectRepository;
    private final ITaskRepository taskRepository;
    private final ISubTaskRepository subTaskRepository;


    @Override
    public PersistResponse create(CreateUpdateLogRequest request) {
        // previous validations
        PersistResponse persistResponse = new PersistResponse();
        try {
            //the project must not be empty and must be owned by the user who requests
            ProjectEntity project = null;
            if (request.getProjectId() != 0)
                project = projectRepository.findById(request.getProjectId());

            if (project == null || !project.getOwner().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.INVALID_PROJECT);

            // the task can be empty. if not empty, must by owned by the user who requests and related to the given project
            TaskEntity task = null;
            if(request.getTaskId() != 0){
                task = taskRepository.findById(request.getTaskId());
                if(task == null)
                    throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.TASK_NOT_FOUND);
            }
            if(task != null && !task.getProject().getOwner().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.INVALID_TASK);
            if(!isTaskInProject(task,project))
                throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.TASK_RELATION_ERROR);

            // the subtask can be empty. if not empty, must by owned by the user who requests and related to the given task
            SubtaskEntity subtask = null;
            if(request.getSubtaskId() != 0){
                subtask = subTaskRepository.findById(request.getSubtaskId());
                if(subtask == null)
                    throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.SUBTASK_NOT_FOUND);
            }

            if(subtask != null && !subtask.getTask().getProject().getOwner().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.INVALID_SUBTASK);
            if(!isSubtaskInTask(subtask,task))
                throw new ActionNotAllowedException(ErrorCodes.CREATION_NOT_ALLOWED, ErrorDescriptions.SUBTASK_RELATION_ERROR);

            // business logic
            LogEntity log = new LogEntity();
            log.setProject(project);
            log.setTask(task);
            log.setSubtask(subtask);
            log.setDate(LocalDate.now());
            log.setLog(request.getLog());
            log.setActive(true);

            LogEntity savedLog = logRepository.save(log);

            // response
            persistResponse = new PersistResponse(Results.OK,"",savedLog, HttpStatus.OK);

        } catch(AppException e){
            persistResponse = Tools.getBadRequest(e, ErrorDescriptions.COULD_NOT_SAVE_PROJECT);
        } catch(Exception e) {
            persistResponse = Tools.getBadRequest(e, ErrorDescriptions.COULD_NOT_SAVE_PROJECT);
        } finally {
            return persistResponse;
        }

    }

    private boolean isTaskInProject(TaskEntity task, ProjectEntity project) {
        if(task == null) return true;
        for (TaskEntity taskLoop : project.getTaskList()) {
            if (taskLoop.getId() == task.getId())
                return true;
        }
        return false;
    }

    private boolean isSubtaskInTask(SubtaskEntity subtask, TaskEntity task) {
        if(subtask == null) return true;
        for(SubtaskEntity subtaskLoop : task.getSubtaskList())
        {
            if(subtaskLoop.getId() == task.getId())
                return true;
        }
        return false;
    }

}
