package com.binnacle.api.response.home;

import com.binnacle.api.entity.ProjectEntity;
import com.binnacle.api.entity.SubtaskEntity;
import com.binnacle.api.entity.TaskEntity;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HomeResponse {
    private List<ProjectEntity> projectList;
    private List<TaskEntity> taskList;
    private List<SubtaskEntity> subtaskList;
}
